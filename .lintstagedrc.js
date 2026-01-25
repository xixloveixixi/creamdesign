module.exports = {
  // TypeScript 和 JavaScript 文件（排除 dist 和 node_modules）
  'src/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  // 样式文件
  'src/**/*.{scss,css}': ['prettier --write'],
  // JSON 和 Markdown 文件
  '*.{json,md}': ['prettier --write'],
};
