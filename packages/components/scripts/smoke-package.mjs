#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(packageRoot, 'src');
const packageJsonPath = path.join(packageRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const failures = [];

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function getPublicSourceSubpaths() {
  return fs
    .readdirSync(srcRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && /^[A-Z]/.test(entry.name))
    .filter(entry => {
      const componentDir = path.join(srcRoot, entry.name);

      return ['index.ts', 'index.tsx'].some(indexFile =>
        fs.existsSync(path.join(componentDir, indexFile))
      );
    })
    .map(entry => toKebabCase(entry.name))
    .sort();
}

function getExportSubpaths() {
  return Object.keys(packageJson.exports ?? {})
    .filter(exportName => exportName.startsWith('./'))
    .map(exportName => exportName.slice(2))
    .sort();
}

function assertFileExists(relativePath, label) {
  const absolutePath = path.join(packageRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${label} 指向不存在的文件：${relativePath}`);
    return;
  }

  let currentPath = packageRoot;
  for (const segment of relativePath.split('/')) {
    const entries = fs.readdirSync(currentPath);
    if (!entries.includes(segment)) {
      failures.push(`${label} 路径大小写不匹配：${relativePath}`);
      return;
    }
    currentPath = path.join(currentPath, segment);
  }
}

function assertExportTarget(exportName, condition, target) {
  if (typeof target !== 'string') {
    failures.push(`${exportName} 缺少 ${condition} 字符串目标`);
    return;
  }

  if (!target.startsWith('./')) {
    failures.push(`${exportName} 的 ${condition} 必须使用相对路径：${target}`);
    return;
  }

  assertFileExists(target.slice(2), `${exportName}.${condition}`);
}

if (packageJson.type !== 'module') {
  failures.push(
    'package.json 应保持 "type": "module"，并通过 .cjs 明确 CJS 产物'
  );
}

if (!packageJson.exports || typeof packageJson.exports !== 'object') {
  failures.push('package.json 必须声明 exports');
}

assertFileExists(packageJson.main, 'main');
assertFileExists(packageJson.module, 'module');
assertFileExists(packageJson.types, 'types');
assertFileExists(packageJson.style, 'style');

if (!packageJson.main.endsWith('.cjs')) {
  failures.push(`main 应指向 .cjs 文件，当前为：${packageJson.main}`);
}

if (!packageJson.module.endsWith('.mjs')) {
  failures.push(`module 应指向 .mjs 文件，当前为：${packageJson.module}`);
}

for (const [exportName, exportConfig] of Object.entries(
  packageJson.exports ?? {}
)) {
  if (typeof exportConfig === 'string') {
    assertExportTarget(exportName, 'default', exportConfig);
    continue;
  }

  for (const condition of ['types', 'import', 'require', 'style']) {
    if (exportConfig[condition]) {
      assertExportTarget(exportName, condition, exportConfig[condition]);
    }
  }

  if (
    exportConfig.import &&
    !exportConfig.import.endsWith('.mjs') &&
    !exportConfig.import.endsWith('.css')
  ) {
    failures.push(
      `${exportName}.import 应指向 .mjs 或 .css 文件：${exportConfig.import}`
    );
  }

  if (exportConfig.require && !exportConfig.require.endsWith('.cjs')) {
    failures.push(
      `${exportName}.require 应指向 .cjs 文件：${exportConfig.require}`
    );
  }
}

const publicSourceSubpaths = getPublicSourceSubpaths();
const exportSubpaths = getExportSubpaths();
const runtimeExportSubpaths = exportSubpaths.filter(
  subpath => subpath !== 'style'
);

for (const subpath of publicSourceSubpaths) {
  if (!packageJson.exports[`./${subpath}`]) {
    failures.push(`缺少子路径导出：./${subpath}`);
    continue;
  }

  const exportConfig = packageJson.exports[`./${subpath}`];
  for (const condition of ['types', 'import', 'require']) {
    if (!exportConfig?.[condition]) {
      failures.push(`./${subpath} 缺少 ${condition} 导出条件`);
    }
  }
}

for (const subpath of runtimeExportSubpaths) {
  if (!publicSourceSubpaths.includes(subpath)) {
    failures.push(`子路径导出缺少对应源码入口：./${subpath}`);
  }
}

if (!packageJson.exports?.['./style']?.import) {
  failures.push('缺少样式子路径导出：./style.import');
}

if (packageJson.exports?.['./style']?.import !== './dist/index.css') {
  failures.push('./style.import 应指向 ./dist/index.css');
}

for (const sideEffect of ['*.css', '*.scss']) {
  if (!packageJson.sideEffects?.includes(sideEffect)) {
    failures.push(`sideEffects 应包含 ${sideEffect}`);
  }
}

for (const peerName of ['react', 'react-dom']) {
  if (!packageJson.peerDependencies?.[peerName]) {
    failures.push(`peerDependencies 应包含 ${peerName}`);
  }
}

if (failures.length > 0) {
  console.error('组件包 smoke 校验失败：');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('组件包 smoke 校验通过');
