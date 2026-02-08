# CI/CD 配置指南

本文档说明如何配置和使用项目的 CI/CD 流程。

## 📋 工作流概览

项目包含以下 GitHub Actions 工作流：

1. **CI** (`ci.yml`) - 持续集成：代码检查、测试、构建
2. **Release** (`release.yml`) - 自动发布到 npm
3. **Preview** (`preview.yml`) - PR 预览部署（Storybook）
4. **CodeQL** (`codeql.yml`) - 代码安全分析

## 🔧 配置 Secrets

在 GitHub 仓库设置中添加以下 Secrets：

### 必需配置

#### 1. NPM_TOKEN（用于发布到 npm）

1. 登录 [npmjs.com](https://www.npmjs.com)
2. 进入 **Account Settings** → **Access Tokens**
3. 点击 **Generate New Token** → **Automation**
4. 复制生成的 token
5. 在 GitHub 仓库：**Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: 粘贴你的 npm token

#### 2. SURGE_TOKEN（用于 PR 预览）

1. 安装 Surge CLI：`npm install -g surge`
2. 登录 Surge：`surge login`
3. 获取 token：
   ```bash
   cat ~/.netrc
   # 或
   cat ~/.config/surge/credentials
   ```
4. 在 GitHub 仓库添加 Secret：
   - Name: `SURGE_TOKEN`
   - Value: 你的 Surge token

#### 3. SURGE_DOMAIN（可选，用于自定义预览域名）

如果不设置，将使用默认格式：`creamdesign-pr-{PR_NUMBER}.surge.sh`

- Name: `SURGE_DOMAIN`
- Value: 你的自定义域名（如：`preview.creamdesign.com`）

#### 4. CODECOV_TOKEN（可选，用于代码覆盖率）

1. 访问 [codecov.io](https://codecov.io)
2. 使用 GitHub 账号登录
3. 添加仓库并获取 token
4. 在 GitHub 仓库添加 Secret：
   - Name: `CODECOV_TOKEN`
   - Value: 你的 Codecov token

## 🚀 工作流说明

### CI 工作流

**触发时机：**

- Push 到 `main` 或 `develop` 分支
- 创建 Pull Request 到 `main` 或 `develop` 分支

**执行任务：**

1. ✅ Lint 检查（ESLint）
2. ✅ 代码格式检查（Prettier）
3. ✅ 运行测试（Jest）
4. ✅ 生成代码覆盖率报告
5. ✅ 构建组件库（Rollup）
6. ✅ 构建 Storybook

### Release 工作流

**触发时机：**

- 推送版本标签（如 `v0.1.0`）
- 手动触发（Workflow Dispatch）

**执行任务：**

1. ✅ 运行测试
2. ✅ 构建组件库
3. ✅ 更新版本号
4. ✅ 生成 CHANGELOG
5. ✅ 发布到 npm
6. ✅ 创建 GitHub Release

**使用方法：**

#### 方式 1：通过 Git 标签发布

```bash
# 1. 更新版本号（手动或通过 npm version）
npm version patch  # 0.1.0 -> 0.1.1
# 或
npm version minor  # 0.1.0 -> 0.2.0
# 或
npm version major  # 0.1.0 -> 1.0.0

# 2. 推送标签
git push origin main --tags
```

#### 方式 2：手动触发

1. 在 GitHub 仓库页面，点击 **Actions** 标签
2. 选择 **Release** 工作流
3. 点击 **Run workflow**
4. 输入版本号（如：`0.1.0`）
5. 点击 **Run workflow**

### Preview 工作流

**触发时机：**

- 创建 Pull Request
- 更新 Pull Request（push 新代码）

**执行任务：**

1. ✅ 构建 Storybook
2. ✅ 部署到 Surge
3. ✅ 在 PR 中评论预览链接

**预览链接格式：**

- `https://creamdesign-pr-{PR_NUMBER}.surge.sh`

### CodeQL 工作流

**触发时机：**

- Push 到 `main` 或 `develop` 分支
- 创建 Pull Request
- 每周日自动运行（定时任务）

**执行任务：**

- 代码安全分析
- 检测潜在的安全漏洞

## 📝 使用示例

### 日常开发流程

1. **创建功能分支**

   ```bash
   git checkout -b feature/new-component
   ```

2. **开发并提交**

   ```bash
   git add .
   git commit -m "feat: add new component"
   git push origin feature/new-component
   ```

3. **创建 Pull Request**
   - CI 工作流自动运行
   - Preview 工作流自动部署预览
   - 在 PR 中查看测试结果和预览链接

4. **合并到主分支**
   ```bash
   git checkout main
   git merge feature/new-component
   git push origin main
   ```

### 发布新版本

1. **准备发布**

   ```bash
   # 确保所有更改已提交
   git add .
   git commit -m "chore: prepare for release"
   ```

2. **创建版本标签**

   ```bash
   npm version patch  # 或 minor, major
   git push origin main --tags
   ```

3. **自动发布**
   - Release 工作流自动运行
   - 发布到 npm
   - 创建 GitHub Release

## 🔍 查看工作流状态

1. 在 GitHub 仓库页面，点击 **Actions** 标签
2. 查看工作流运行历史
3. 点击具体运行查看详细日志

## 🐛 故障排查

### CI 失败

- **Lint 失败**：运行 `npm run lint:fix` 修复问题
- **测试失败**：检查测试用例，运行 `npm test` 本地验证
- **构建失败**：检查 `rollup.config.js` 配置，运行 `npm run build-es` 本地验证

### Release 失败

- **npm 发布失败**：检查 `NPM_TOKEN` 是否正确配置
- **版本号冲突**：确保版本号在 npm 中不存在

### Preview 失败

- **Surge 部署失败**：检查 `SURGE_TOKEN` 是否正确配置
- **域名冲突**：PR 编号可能已存在，Surge 会自动处理

## 📚 相关资源

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Surge.sh 文档](https://surge.sh/help)
- [npm 发布指南](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
