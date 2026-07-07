# CreamDesign AI Harness

这个 harness 是 CreamDesign AI 辅助开发的轻量验证层。

它本身不运行 agent，而是验证一次已经完成的 AI 辅助改动是否满足 case 定义：

- 必需文件是否存在，
- 禁止触碰的生成产物是否未被修改，
- 关键文本是否出现在指定文件中，
- 任务需要的验证命令是否有记录，
- 明确运行某个命令型 case 时，可以执行命令并检查输出。

## 运行方式

```bash
node .ai/harness/run-harness.mjs
```

运行单个 case：

```bash
node .ai/harness/run-harness.mjs release-exports-smoke
```

运行构建日志门禁：

```bash
node .ai/harness/run-harness.mjs build-warning-free
```

## Case 格式

Case 位于 `.ai/harness/cases/*.json`。

协议文件位于 `.ai/harness/protocols/*.md`。协议用于沉淀 AI 在特定问题类型下的上下文读取流程，case 负责检查协议文件和触发入口是否存在。

每个 case 可以定义：

- `id`：稳定的 case id。
- `description`：这个 case 检查什么。
- `requiredFiles`：必须存在的文件。
- `forbiddenTouchedPaths`：该类任务不应修改的生成产物或高风险路径。
- `contains`：针对文件内容的文本检查。
- `commands`：实现该 case 时，人或 agent 应运行的命令。
- `commandChecks`：可选的命令检查。只有显式运行指定 case，或 case 设置 `runCommandChecksByDefault: true` 时才会执行。
  - `command` / `args`：要运行的命令和参数。
  - `env`：附加环境变量。
  - `requiredOutput`：命令输出里必须出现的文本。
  - `forbiddenOutput`：命令输出里禁止出现的文本。
  - `cleanupPaths`：命令运行后需要清理的生成物路径，会执行 `git restore` 和 `git clean`。
- `forbiddenTouchedPathsAfterCommands`：命令和清理完成后仍禁止出现在 git dirty 状态里的路径。

第一版故意保持检查简单。后续如果发现 AI 反复出现某类失败，再增加更严格的 grader。
