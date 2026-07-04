import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {execFileSync, spawnSync} from 'node:child_process';

const repoRoot = process.cwd();
const casesDir = path.join(repoRoot, '.ai', 'harness', 'cases');
const requestedCaseIds = new Set(process.argv.slice(2));

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function listCaseFiles() {
  return readdirSync(casesDir)
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => path.join(casesDir, fileName))
    .sort();
}

function getChangedFiles() {
  try {
    const output = execFileSync('git', ['status', '--short'], {
      cwd: repoRoot,
      encoding: 'utf8',
    });

    return output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => line.replace(/^.. /, '').replace(/^R  .* -> /, ''));
  } catch {
    return [];
  }
}

function runGit(args) {
  try {
    execFileSync('git', args, {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    });
  } catch {
    // Best-effort cleanup. Any remaining dirty paths are reported by checks.
  }
}

function matchesPathPrefix(filePath, prefix) {
  return filePath === prefix || filePath.startsWith(`${prefix}/`);
}

function runCommandCheck(commandCheck) {
  const env = {
    ...process.env,
    ...(commandCheck.env ?? {}),
  };

  const result = spawnSync(commandCheck.command, commandCheck.args ?? [], {
    cwd: path.join(repoRoot, commandCheck.cwd ?? '.'),
    env,
    encoding: 'utf8',
    shell: false,
  });

  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  const failures = [];

  if (result.status !== 0) {
    failures.push(
      `Command failed (${result.status ?? 'unknown'}): ${[
        commandCheck.command,
        ...(commandCheck.args ?? []),
      ].join(' ')}`
    );
  }

  for (const text of commandCheck.forbiddenOutput ?? []) {
    if (output.includes(text)) {
      failures.push(`Forbidden output matched: ${text}`);
    }
  }

  for (const text of commandCheck.requiredOutput ?? []) {
    if (!output.includes(text)) {
      failures.push(`Missing required output: ${text}`);
    }
  }

  for (const cleanupPath of commandCheck.cleanupPaths ?? []) {
    runGit(['restore', '--', cleanupPath]);
    runGit(['clean', '-fd', '--', cleanupPath]);
  }

  return failures;
}

function checkCase(testCase, changedFiles, shouldRunCommandChecks) {
  const failures = [];

  for (const filePath of testCase.requiredFiles ?? []) {
    if (!existsSync(path.join(repoRoot, filePath))) {
      failures.push(`Missing required file: ${filePath}`);
    }
  }

  for (const rule of testCase.contains ?? []) {
    const absolutePath = path.join(repoRoot, rule.file);
    if (!existsSync(absolutePath)) {
      failures.push(`Cannot check missing file: ${rule.file}`);
      continue;
    }

    const content = readFileSync(absolutePath, 'utf8');
    for (const text of rule.text ?? []) {
      if (!content.includes(text)) {
        failures.push(`Missing expected text in ${rule.file}: ${text}`);
      }
    }
  }

  for (const forbiddenPath of testCase.forbiddenTouchedPaths ?? []) {
    const touched = changedFiles.some(filePath => matchesPathPrefix(filePath, forbiddenPath));
    if (touched) {
      failures.push(`Forbidden path touched: ${forbiddenPath}`);
    }
  }

  if (testCase.commandChecks?.length && shouldRunCommandChecks) {
    for (const commandCheck of testCase.commandChecks) {
      failures.push(...runCommandCheck(commandCheck));
    }
  }

  const finalChangedFiles = shouldRunCommandChecks ? getChangedFiles() : changedFiles;
  for (const forbiddenPath of testCase.forbiddenTouchedPathsAfterCommands ?? []) {
    const touched = finalChangedFiles.some(filePath => matchesPathPrefix(filePath, forbiddenPath));
    if (touched) {
      failures.push(`Forbidden path touched after commands: ${forbiddenPath}`);
    }
  }

  return failures;
}

const changedFiles = getChangedFiles();
const cases = listCaseFiles()
  .map(readJson)
  .filter(testCase => requestedCaseIds.size === 0 || requestedCaseIds.has(testCase.id));

if (cases.length === 0) {
  console.error('没有匹配到 harness case。');
  process.exit(1);
}

let failed = false;

for (const testCase of cases) {
  const shouldRunCommandChecks =
    requestedCaseIds.size > 0 || testCase.runCommandChecksByDefault === true;
  const failures = checkCase(testCase, changedFiles, shouldRunCommandChecks);
  if (failures.length > 0) {
    failed = true;
    console.error(`失败 ${testCase.id}`);
    for (const failure of failures) {
      console.error(`  - ${failure}`);
    }
    continue;
  }

  console.log(`通过 ${testCase.id}`);
  if (testCase.commands?.length) {
    console.log('  建议验证命令：');
    for (const command of testCase.commands) {
      console.log(`  - ${command}`);
    }
  }
}

if (failed) {
  process.exit(1);
}
