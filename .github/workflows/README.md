# GitHub Actions 工作流

本目录包含项目的 CI/CD 自动化工作流配置。

## 📁 工作流文件

- **`ci.yml`** - 持续集成：代码检查、测试、构建
- **`release.yml`** - 自动发布到 npm
- **`preview.yml`** - PR 预览部署（Storybook + Surge）
- **`codeql.yml`** - 代码安全分析

## 🚀 快速开始

1. **配置 Secrets**（详见 [CICD_SETUP.md](../CICD_SETUP.md)）
   - `NPM_TOKEN` - npm 发布 token
   - `SURGE_TOKEN` - Surge 部署 token
   - `CODECOV_TOKEN` - 代码覆盖率 token（可选）

2. **推送代码** - CI 工作流会自动运行

3. **创建 PR** - Preview 工作流会自动部署预览

4. **发布版本** - 推送版本标签触发 Release 工作流

## 📚 详细文档

查看 [CICD_SETUP.md](../CICD_SETUP.md) 获取完整的配置和使用指南。
