#!/usr/bin/env node

/**
 * 构建后处理脚本：将类型定义文件从 dist/component/ 复制到按需加载的组件目录
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentMap = {
  button: 'Button',
  'config-provider': 'ConfigProvider',
  menu: 'Menu',
  table: 'Table',
  form: 'Form',
  input: 'Input',
  progress: 'Progress',
  pagination: 'Pagination',
  upload: 'Upload',
  icon: 'Icon',
  card: 'Card',
  timeline: 'Timeline',
  tag: 'Tag',
  message: 'Message',
};

const distDir = path.join(__dirname, '../dist');

function copyDirSync(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(sourcePath, targetPath);
      continue;
    }

    if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function normalizeComponentDir(outputName, sourceName) {
  if (outputName === sourceName) {
    return;
  }

  const sourceDir = path.join(distDir, sourceName);
  const targetDir = path.join(distDir, outputName);

  if (!fs.existsSync(sourceDir)) {
    return;
  }

  const sourceRealPath = fs.realpathSync.native(sourceDir);
  const targetRealPath = fs.existsSync(targetDir)
    ? fs.realpathSync.native(targetDir)
    : undefined;

  if (targetRealPath && sourceRealPath === targetRealPath) {
    const tempDir = path.join(distDir, `.__casefix_${outputName}`);
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.renameSync(sourceDir, tempDir);
    fs.renameSync(tempDir, targetDir);
    return;
  }

  copyDirSync(sourceDir, targetDir);
  fs.rmSync(sourceDir, { recursive: true, force: true });
}

function normalizeRootTypeImports() {
  const indexDts = path.join(distDir, 'index.d.ts');

  if (!fs.existsSync(indexDts)) {
    return;
  }

  let content = fs.readFileSync(indexDts, 'utf8');

  for (const [outputName, sourceName] of Object.entries(componentMap)) {
    content = content.replaceAll(`'./${sourceName}'`, `'./${outputName}'`);
    content = content.replaceAll(`"./${sourceName}"`, `"./${outputName}"`);
  }

  fs.writeFileSync(indexDts, content);
}

// 复制类型定义文件
Object.entries(componentMap).forEach(([outputName, sourceName]) => {
  const sourceDir = path.join(distDir, sourceName);
  const targetDir = path.join(distDir, outputName);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: Source directory ${sourceDir} does not exist`);
    return;
  }

  // 确保目标目录存在
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 复制 index.d.ts 和 index.d.ts.map
  const indexDts = path.join(sourceDir, 'index.d.ts');
  const indexDtsMap = path.join(sourceDir, 'index.d.ts.map');

  if (fs.existsSync(indexDts)) {
    fs.copyFileSync(indexDts, path.join(targetDir, 'index.d.ts'));
    console.log(
      `✓ Copied ${sourceName}/index.d.ts -> ${outputName}/index.d.ts`
    );
  }

  if (fs.existsSync(indexDtsMap)) {
    fs.copyFileSync(indexDtsMap, path.join(targetDir, 'index.d.ts.map'));
  }

  // 复制所有相关的 .d.ts 文件（用于类型引用）
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    if (
      fs.statSync(sourceFile).isFile() &&
      file.endsWith('.d.ts') &&
      file !== 'index.d.ts'
    ) {
      const targetFile = path.join(targetDir, file);
      if (sourceFile !== targetFile) {
        fs.copyFileSync(sourceFile, targetFile);
      }

      // 同时复制 .map 文件
      const mapFile = sourceFile + '.map';
      if (fs.existsSync(mapFile) && mapFile !== targetFile + '.map') {
        fs.copyFileSync(mapFile, targetFile + '.map');
      }
    }
  });
});

Object.entries(componentMap).forEach(([outputName, sourceName]) => {
  normalizeComponentDir(outputName, sourceName);
});

normalizeRootTypeImports();

console.log('✓ Type definition files copied successfully');
