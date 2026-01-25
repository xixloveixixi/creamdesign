module.exports = {
  // TypeScript 和 JavaScript 文件
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  // 样式文件
  '*.{scss,css}': ['prettier --write'],
  // JSON 文件
  '*.{json,md}': ['prettier --write'],
};
