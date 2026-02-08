# CI/CD 配置总结

## ✅ 已配置的工作流

### 1. CI 工作流 (`ci.yml`)

- **触发时机**: Push 到 main/develop 分支，创建 PR
- **功能**:
  - ✅ ESLint 代码检查
  - ✅ Prettier 格式检查
  - ✅ Jest 单元测试
  - ✅ 代码覆盖率上传（Codecov）
  - ✅ 构建组件库（Rollup）
  - ✅ 构建 Storybook

### 2. Release 工作流 (`release.yml`)

- **触发时机**: 推送版本标签（v\*），手动触发
- **功能**:
  - ✅ 运行测试
  - ✅ 构建组件库
  - ✅ 自动更新版本号
  - ✅ 生成 CHANGELOG
  - ✅ 发布到 npm
  - ✅ 创建 GitHub Release

### 3. Preview 工作流 (`preview.yml`)

- **触发时机**: 创建/更新 Pull Request
- **功能**:
  - ✅ 构建 Storybook
  - ✅ 部署到 Surge
  - ✅ 在 PR 中评论预览链接

### 4. CodeQL 工作流 (`codeql.yml`)

- **触发时机**: Push、PR、每周定时
- **功能**:
  - ✅ 代码安全分析
  - ✅ 检测安全漏洞

## 🔑 需要配置的 Secrets

在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

1. **NPM_TOKEN** (必需)
   - 用于发布到 npm
   - 获取方式：npmjs.com → Account Settings → Access Tokens

2. **SURGE_TOKEN** (必需)
   - 用于 PR 预览部署
   - 获取方式：`surge login` 后查看 `~/.netrc` 或 `~/.config/surge/credentials`

3. **CODECOV_TOKEN** (可选)
   - 用于代码覆盖率报告
   - 获取方式：codecov.io 注册并添加仓库

## 📝 使用示例

### 发布新版本

```bash
# 方式 1: 通过 Git 标签
npm version patch  # 或 minor, major
git push origin main --tags

# 方式 2: 手动触发
# GitHub Actions → Release → Run workflow → 输入版本号
```

### 查看 CI 状态

1. 访问 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看工作流运行历史

### PR 预览

1. 创建 Pull Request
2. Preview 工作流自动运行
3. 在 PR 评论中查看预览链接

## 📚 相关文档

- [详细配置指南](CICD_SETUP.md)
- [工作流文件说明](workflows/README.md)
