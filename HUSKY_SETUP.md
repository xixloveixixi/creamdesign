# Husky 配置指南

## 📋 安装步骤

### 1. 安装依赖

```bash
npm install --save-dev husky lint-staged
```

### 2. 初始化 Husky

```bash
npx husky install
```

### 3. 设置 prepare 脚本（已自动添加到 package.json）

```bash
npm run prepare
```

---

## 🔧 配置说明

### Pre-commit Hook

在提交代码前自动运行：

- ✅ ESLint 检查并自动修复
- ✅ Prettier 格式化代码
- ✅ 只检查暂存的文件（通过 lint-staged）

### Commit-msg Hook

检查 commit message 格式：

- ✅ 不能为空
- ✅ 至少 10 个字符
- ⚠️ 建议使用约定式提交格式

### 约定式提交格式

```
type(scope): subject

例如:
feat(table): 添加虚拟滚动功能
fix(form): 修复移动端布局问题
docs: 更新 README
style: 格式化代码
refactor: 重构 Table 组件
test: 添加单元测试
chore: 更新依赖
```

**类型说明**：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关
- `perf`: 性能优化
- `ci`: CI 配置
- `build`: 构建系统
- `revert`: 回滚提交

---

## 📝 Lint-staged 配置

已配置为检查以下文件类型：

- `*.{ts,tsx,js,jsx}`: ESLint + Prettier
- `*.{scss,css}`: Prettier
- `*.{json,md}`: Prettier

---

## 🚀 使用

### 正常提交

```bash
git add .
git commit -m "feat(table): 添加虚拟滚动功能"
```

Husky 会自动：

1. 运行 lint-staged 检查暂存文件
2. 自动修复 ESLint 错误
3. 自动格式化代码
4. 检查 commit message 格式

### 跳过 Hook（不推荐）

```bash
# 跳过 pre-commit hook
git commit --no-verify -m "紧急修复"
```

---

## 🔍 故障排除

### Hook 不执行

1. 确保已运行 `npm run prepare`
2. 检查 `.husky` 目录是否存在
3. 检查 hook 文件是否有执行权限：`chmod +x .husky/pre-commit`

### ESLint 错误阻止提交

1. 运行 `npm run lint:fix` 自动修复
2. 手动修复错误
3. 重新提交

### Prettier 格式化问题

1. 运行 `npm run format` 格式化所有文件
2. 重新提交

---

## 📚 相关命令

```bash
# 运行 ESLint
npm run lint

# 自动修复 ESLint 错误
npm run lint:fix

# 格式化所有文件
npm run format

# 初始化 Husky（首次安装后）
npm run prepare
```

---

## ✅ 验证

提交代码时，你应该看到：

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
[main abc1234] feat(table): 添加虚拟滚动功能
```

如果看到错误，请根据提示修复后重新提交。
