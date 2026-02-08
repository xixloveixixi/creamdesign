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
  Button: 'button',
  Menu: 'menu',
  Table: 'table',
  Form: 'form',
  Input: 'input',
  Progress: 'progress',
  Pagination: 'pagination',
  Upload: 'upload',
  Icon: 'icon',
};

const distDir = path.join(__dirname, '../dist');
const componentDir = path.join(distDir, 'component');

// 复制类型定义文件
Object.entries(componentMap).forEach(([componentName, outputName]) => {
  const sourceDir = path.join(componentDir, componentName);
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
      `✓ Copied ${componentName}/index.d.ts -> ${outputName}/index.d.ts`
    );
  }

  if (fs.existsSync(indexDtsMap)) {
    fs.copyFileSync(indexDtsMap, path.join(targetDir, 'index.d.ts.map'));
  }

  // 复制所有相关的 .d.ts 文件（用于类型引用）
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    if (file.endsWith('.d.ts') && file !== 'index.d.ts') {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);
      fs.copyFileSync(sourceFile, targetFile);

      // 同时复制 .map 文件
      const mapFile = sourceFile + '.map';
      if (fs.existsSync(mapFile)) {
        fs.copyFileSync(mapFile, targetFile + '.map');
      }
    }
  });
});

console.log('✓ Type definition files copied successfully');
