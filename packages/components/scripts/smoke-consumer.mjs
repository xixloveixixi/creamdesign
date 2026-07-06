#!/usr/bin/env node

import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(packageRoot, '../..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
);

const failures = [];
let tempRoot;

function fail(message) {
  failures.push(message);
}

function run(command, args, options = {}) {
  try {
    return execFileSync(command, args, {
      cwd: options.cwd ?? packageRoot,
      encoding: 'utf8',
      stdio: options.stdio ?? 'pipe',
      env: {
        ...process.env,
        ...options.env,
      },
    });
  } catch (error) {
    const output = [error.stdout, error.stderr].filter(Boolean).join('\n');
    throw new Error(
      `${command} ${args.join(' ')} 执行失败${output ? `\n${output}` : ''}`
    );
  }
}

function toTarEntry(packageRelativePath) {
  return `package/${packageRelativePath.replace(/\\/g, '/')}`;
}

function assertTarEntry(tarEntries, packageRelativePath, label) {
  const expected = toTarEntry(packageRelativePath);
  if (!tarEntries.has(expected)) {
    fail(`${label} 未进入 npm tarball：${expected}`);
  }
}

function assertFileExists(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} 不存在：${filePath}`);
  }
}

function linkDependency(consumerNodeModules, dependencyName) {
  const sourceCandidates = [
    path.join(packageRoot, 'node_modules', dependencyName),
    path.join(repoRoot, 'node_modules', dependencyName),
  ];
  const source = sourceCandidates.find(candidate => fs.existsSync(candidate));

  if (!source) {
    fail(`临时消费项目缺少依赖：${dependencyName}`);
    return;
  }

  const target = path.join(consumerNodeModules, dependencyName);
  fs.mkdirSync(path.dirname(target), {recursive: true});

  if (fs.existsSync(target)) {
    return;
  }

  fs.symlinkSync(source, target, process.platform === 'win32' ? 'junction' : 'dir');
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), {recursive: true});
  fs.writeFileSync(filePath, content);
}

function createConsumerProject(extractedPackageDir) {
  const consumerDir = path.join(tempRoot, 'consumer');
  const consumerNodeModules = path.join(consumerDir, 'node_modules');
  const installedPackageDir = path.join(
    consumerNodeModules,
    packageJson.name
  );

  fs.mkdirSync(consumerNodeModules, {recursive: true});
  fs.cpSync(extractedPackageDir, installedPackageDir, {recursive: true});

  const dependencies = new Set([
    ...Object.keys(packageJson.peerDependencies ?? {}),
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
  ]);

  for (const dependencyName of dependencies) {
    linkDependency(consumerNodeModules, dependencyName);
  }

  writeFile(
    path.join(consumerDir, 'package.json'),
    JSON.stringify(
      {
        name: 'creamdesign-consumer-smoke',
        private: true,
        type: 'module',
      },
      null,
      2
    )
  );

  writeFile(
    path.join(consumerDir, 'esm-smoke.mjs'),
    `
import {Button, Table, Message} from 'creamdesign-lib';
import {ConfigProvider, themeToCSSVariables, defaultTheme, enterpriseTheme} from 'creamdesign-lib';
import ButtonDefault, {ButtonType} from 'creamdesign-lib/button';
import ConfigProviderDefault from 'creamdesign-lib/config-provider';
import {Message as MessageSubpath} from 'creamdesign-lib/message';

const styleUrl = import.meta.resolve('creamdesign-lib/style');
const cssVariables = themeToCSSVariables(defaultTheme);
const enterpriseCssVariables = themeToCSSVariables(enterpriseTheme);

if (typeof Button !== 'function') throw new Error('根导入 Button 不可用');
if (typeof Table !== 'function') throw new Error('根导入 Table 不可用');
if (typeof ConfigProvider !== 'function') throw new Error('根导入 ConfigProvider 不可用');
if (typeof ConfigProviderDefault !== 'function') throw new Error('子路径导入 ConfigProvider 默认导出不可用');
if (cssVariables['--cream-color-primary'] !== defaultTheme.token.colorPrimary) throw new Error('主题 CSS 变量转换不可用');
if (enterpriseCssVariables['--cream-color-primary'] !== enterpriseTheme.token.colorPrimary) throw new Error('enterpriseTheme CSS 变量转换不可用');
if (typeof Message?.success !== 'function') throw new Error('根导入 Message.success 不可用');
if (typeof ButtonDefault !== 'function') throw new Error('子路径导入 Button 默认导出不可用');
if (ButtonType.Primary !== 'primary') throw new Error('子路径导入 ButtonType 不可用');
if (typeof MessageSubpath?.info !== 'function') throw new Error('子路径导入 Message 不可用');
if (!styleUrl.endsWith('/dist/index.css')) throw new Error('样式子路径没有解析到 dist/index.css');
`
  );

  writeFile(
    path.join(consumerDir, 'cjs-smoke.cjs'),
    `
const root = require('creamdesign-lib');
const button = require('creamdesign-lib/button');
const configProvider = require('creamdesign-lib/config-provider');
const message = require('creamdesign-lib/message');
const cssVariables = root.themeToCSSVariables(root.defaultTheme);
const enterpriseCssVariables = root.themeToCSSVariables(root.enterpriseTheme);

if (typeof root.Button !== 'function') throw new Error('CJS 根导入 Button 不可用');
if (typeof root.Table !== 'function') throw new Error('CJS 根导入 Table 不可用');
if (typeof root.ConfigProvider !== 'function') throw new Error('CJS 根导入 ConfigProvider 不可用');
if (typeof configProvider.default !== 'function') throw new Error('CJS 子路径导入 ConfigProvider 默认导出不可用');
if (cssVariables['--cream-color-primary'] !== root.defaultTheme.token.colorPrimary) throw new Error('CJS 主题 CSS 变量转换不可用');
if (enterpriseCssVariables['--cream-color-primary'] !== root.enterpriseTheme.token.colorPrimary) throw new Error('CJS enterpriseTheme CSS 变量转换不可用');
if (typeof root.Message?.success !== 'function') throw new Error('CJS 根导入 Message.success 不可用');
if (typeof button.default !== 'function') throw new Error('CJS 子路径导入 Button 默认导出不可用');
if (button.ButtonType.Primary !== 'primary') throw new Error('CJS 子路径导入 ButtonType 不可用');
if (typeof message.Message?.info !== 'function') throw new Error('CJS 子路径导入 Message 不可用');
`
  );

  writeFile(
    path.join(consumerDir, 'ts-smoke.tsx'),
    `
import {Button, ConfigProvider, Table, Message, enterpriseTheme, mergeTheme, themeToCSSVariables, type MessageOptions, type TableProps, type ThemeConfig} from 'creamdesign-lib';
import ButtonDefault, {ButtonType, type ButtonTypeValue} from 'creamdesign-lib/button';
import ConfigProviderDefault from 'creamdesign-lib/config-provider';

type Row = {
  key: string;
  name: string;
};

const buttonType: ButtonTypeValue = ButtonType.Primary;
const messageOptions: MessageOptions = {
  content: 'ok',
  duration: 1000,
};
const closeMessage = Message.success({
  content: 'typed ok',
  duration: 0,
});
const closeTextMessage = Message.success('typed text ok', {
  duration: 0,
});
const columns: TableProps<Row>['columns'] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
  },
];
const theme: ThemeConfig = {
  token: {
    colorPrimary: '#7c3aed',
  },
  components: {
    Button: {
      borderRadius: 4,
    },
  },
};

const rootButton = <Button btnType={buttonType}>ok</Button>;
const subpathButton = <ButtonDefault btnType="primary">ok</ButtonDefault>;
const themedButton = (
  <ConfigProvider theme={theme}>
    <ConfigProviderDefault>
      <Button btnType="primary">提交</Button>
    </ConfigProviderDefault>
  </ConfigProvider>
);
const table = <Table<Row> columns={columns} dataSource={[{key: '1', name: 'Ada'}]} />;
const cssVariables = themeToCSSVariables(mergeTheme(theme));
const enterpriseCssVariables = themeToCSSVariables(mergeTheme(enterpriseTheme));

void messageOptions;
void closeMessage;
void closeTextMessage;
void rootButton;
void subpathButton;
void themedButton;
void table;
void cssVariables;
void enterpriseCssVariables;
void Message;
`
  );

  writeFile(
    path.join(consumerDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          jsx: 'react-jsx',
          strict: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          skipLibCheck: true,
        },
        include: ['ts-smoke.tsx'],
      },
      null,
      2
    )
  );

  return consumerDir;
}

try {
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'creamdesign-smoke-'));
  const packDir = path.join(tempRoot, 'pack');
  const extractDir = path.join(tempRoot, 'extract');

  fs.mkdirSync(packDir, {recursive: true});
  fs.mkdirSync(extractDir, {recursive: true});

  const packOutput = run('pnpm', ['pack', '--pack-destination', packDir]);
  const tarballName = packOutput
    .trim()
    .split('\n')
    .map(line => line.trim())
    .find(line => line.endsWith('.tgz'));
  const tarballPath = tarballName
    ? path.resolve(packDir, path.basename(tarballName))
    : undefined;

  if (!tarballPath || !fs.existsSync(tarballPath)) {
    throw new Error(`未找到 pnpm pack 产物：${packOutput}`);
  }

  const tarEntries = new Set(
    run('tar', ['-tzf', tarballPath])
      .trim()
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
  );

  assertTarEntry(tarEntries, 'package.json', 'package.json');
  assertTarEntry(tarEntries, 'dist/index.mjs', '根 ESM 入口');
  assertTarEntry(tarEntries, 'dist/index.cjs', '根 CJS 入口');
  assertTarEntry(tarEntries, 'dist/index.d.ts', '根类型入口');
  assertTarEntry(tarEntries, 'dist/index.css', '样式入口');

  for (const subpath of ['button', 'config-provider', 'table', 'form', 'upload', 'message']) {
    assertTarEntry(tarEntries, `dist/${subpath}/index.mjs`, `${subpath} ESM 入口`);
    assertTarEntry(tarEntries, `dist/${subpath}/index.cjs`, `${subpath} CJS 入口`);
    assertTarEntry(tarEntries, `dist/${subpath}/index.d.ts`, `${subpath} 类型入口`);
  }

  run('tar', ['-xzf', tarballPath, '-C', extractDir]);
  const extractedPackageDir = path.join(extractDir, 'package');
  assertFileExists(extractedPackageDir, '解压后的 package 目录');

  if (failures.length === 0) {
    const consumerDir = createConsumerProject(extractedPackageDir);
    const tscBin = path.join(repoRoot, 'node_modules/typescript/bin/tsc');

    run(process.execPath, ['esm-smoke.mjs'], {cwd: consumerDir});
    run(process.execPath, ['cjs-smoke.cjs'], {cwd: consumerDir});
    run(
      process.execPath,
      [tscBin, '-p', 'tsconfig.json', '--noEmit', '--pretty', 'false'],
      {
        cwd: consumerDir,
      }
    );
  }
} catch (error) {
  fail(error.message);
} finally {
  if (tempRoot) {
    fs.rmSync(tempRoot, {recursive: true, force: true});
  }
}

if (failures.length > 0) {
  console.error('组件包真实消费 smoke 校验失败：');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('组件包真实消费 smoke 校验通过');
