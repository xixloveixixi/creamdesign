# CI/CD 配置检查清单

在按照 [CICD_SETUP.md](./CICD_SETUP.md) 配置之前，请确认以下事项：

## ✅ 前置检查

### 1. 项目配置检查

- [x] `package.json` 中有 `build-es` 脚本
- [x] `package.json` 中有 `build-storybook` 脚本
- [x] `package.json` 中有 `test` 脚本
- [x] `package.json` 中有 `lint` 脚本
- [x] `package.json` 中有 `changelog` 脚本（可选）
- [x] Rollup 配置文件存在 (`rollup.config.js`)
- [x] TypeScript 配置正确 (`tsconfig.json`)

### 2. 工作流文件检查

- [x] `.github/workflows/ci.yml` 存在
- [x] `.github/workflows/release.yml` 存在
- [x] `.github/workflows/preview.yml` 存在
- [x] `.github/workflows/codeql.yml` 存在

### 3. 必需文件检查

- [ ] `CHANGELOG.md` 文件（Release 工作流需要，如果不存在会自动创建）
- [ ] `.gitignore` 中已忽略 `dist/` 和 `storybook-static/`

## 🔧 配置步骤

### 步骤 1: 配置 GitHub Secrets（必需）

按照文档配置以下 Secrets：

1. **NPM_TOKEN**（如果计划发布到 npm）
   - 获取方式：npmjs.com → Account Settings → Access Tokens
   - 用途：发布包到 npm

2. **SURGE_TOKEN**（如果使用 PR 预览功能）
   - 获取方式：`surge login` 后查看 `~/.netrc`
   - 用途：部署 Storybook 预览

3. **CODECOV_TOKEN**（可选）
   - 获取方式：codecov.io 注册并添加仓库
   - 用途：代码覆盖率报告

### 步骤 2: 测试 CI 工作流

1. 推送代码到 GitHub 仓库
2. 检查 Actions 标签页，确认 CI 工作流运行
3. 验证以下任务是否成功：
   - ✅ Lint 检查
   - ✅ 测试运行
   - ✅ 构建组件库
   - ✅ 构建 Storybook

### 步骤 3: 测试 Preview 工作流（可选）

1. 创建 Pull Request
2. 检查是否自动部署预览
3. 在 PR 评论中查看预览链接

### 步骤 4: 测试 Release 工作流（可选）

1. 创建版本标签：`git tag v0.1.0`
2. 推送标签：`git push origin v0.1.0`
3. 检查 Release 工作流是否运行
4. 验证是否发布到 npm（如果配置了 NPM_TOKEN）

## ⚠️ 注意事项

### 1. CHANGELOG.md

如果 `CHANGELOG.md` 不存在，Release 工作流会尝试生成，但需要：

- 安装了 `conventional-changelog` 依赖
- 使用 Conventional Commits 格式提交

**建议**：手动创建 `CHANGELOG.md` 文件，至少包含一个标题：

```markdown
# Changelog

All notable changes to this project will be documented in this file.
```

### 2. 首次运行可能失败的情况

- **测试失败**：确保所有测试用例通过
- **Lint 失败**：运行 `npm run lint:fix` 修复
- **构建失败**：检查 `rollup.config.js` 配置
- **Surge 部署失败**：检查 `SURGE_TOKEN` 是否正确

### 3. 权限问题

- Release 工作流需要 `contents: write` 权限（已配置）
- 如果发布到 npm，需要确保 NPM_TOKEN 有发布权限

## 🚀 快速开始

1. **配置 Secrets**（至少配置 NPM_TOKEN 和 SURGE_TOKEN）
2. **推送代码**到 GitHub
3. **查看 Actions** 标签页，确认工作流运行
4. **创建 PR** 测试预览功能
5. **创建标签** 测试发布功能

## 📝 验证清单

配置完成后，验证以下功能：

- [ ] CI 工作流在 push/PR 时自动运行
- [ ] Lint 检查通过
- [ ] 测试运行通过
- [ ] 构建成功
- [ ] Preview 工作流在 PR 时自动部署（如果配置了 SURGE_TOKEN）
- [ ] Release 工作流在推送标签时自动运行（如果配置了 NPM_TOKEN）

## 🐛 常见问题

### Q: CI 工作流一直失败？

A: 检查错误日志，通常是：

- 测试失败：修复测试用例
- Lint 失败：运行 `npm run lint:fix`
- 构建失败：检查 Rollup 配置

### Q: Preview 工作流没有运行？

A: 检查：

- PR 是否创建在正确的分支
- `SURGE_TOKEN` 是否配置
- 工作流文件是否正确

### Q: Release 工作流没有发布到 npm？

A: 检查：

- `NPM_TOKEN` 是否配置
- 版本号是否已存在
- npm 账号是否有发布权限

## 📚 相关文档

- [详细配置指南](./CICD_SETUP.md)
- [工作流文件说明](./workflows/README.md)
