# 贡献指南

感谢您考虑为Dogbin项目做出贡献！以下是一些指南，帮助您了解如何参与项目开发。

## Git 使用规范

### 分支命名规范

- 使用小写字母，单词之间用连字符（`-`）分隔。
  - 示例：`feature/login-api`、`bugfix/header-styling`
- 采用前缀标识分支类型：
  - `feature/`：新功能开发
  - `bugfix/`：问题修复
  - `hotfix/`：紧急修复
  - `release/`：发布准备
  - `chore/`：日常维护
- 可在分支名称中包含任务编号，以便追踪。
  - 示例：`feature/123-login-api`

### 提交信息规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范：
  - 格式：`<type>(<scope>): <description>`
  - 常用类型：
    - `feat`：新功能
    - `fix`：修复问题
    - `docs`：文档更新
    - `style`：代码格式（不影响功能）
    - `refactor`：重构（非修复或新增功能）
    - `test`：添加或修改测试
    - `chore`：构建过程或辅助工具的变动
  - 示例：`feat(auth): add login endpoint`
- 使用祈使语气，首字母小写，结尾不加句号。
  - 示例：`fix(api): handle null response`
- 提交说明应简洁明了：
  - 首行不超过 50 个字符，正文每行不超过 72 个字符。
- 在正文中详细说明更改动机和背景，可引用相关 issue：
  
  ```markdown
  fix(auth): handle null response

  Ensure the login endpoint returns a 401 status code when the user credentials are invalid.

  Related issue: #123
  ```

### 合并策略

- 所有代码合并应通过 Pull Request（PR）进行，需经过代码审查。
- 主分支（如 `main` 或 `master`）始终保持可部署状态。
- 合并前建议使用 `git rebase`，保持提交历史整洁。
- 使用 "Squash and merge" 合并策略，避免无效提交污染历史。

### 协作流程

- 每个功能或修复应在独立分支上开发，避免直接改动主分支。
- 定期同步主分支，减少合并冲突。
- 提交前请确保：
  - 本地测试全部通过；
  - 遵循项目代码规范；
  - 代码已通过审查。
- 使用代码审查流程（如 GitHub PR）确保团队协作质量。

## 开发流程

1. Fork 项目仓库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 代码风格

- 请遵循项目中已有的代码风格
- 使用空格而非制表符进行缩进
- 保持代码整洁和可读性

## 提交 Pull Request

1. 确保您的 PR 描述清楚地说明了所做的更改和解决的问题
2. 包含任何相关的 issue 编号
3. 更新文档以反映代码更改（如果适用）
4. PR 将在审查后被合并

## 报告 Bug

使用 GitHub Issues 报告 bug，请包含：

- 问题的简要描述
- 重现步骤
- 预期行为
- 截图（如果适用）
- 环境信息

## 功能请求

也可以通过 GitHub Issues 提交功能请求，请描述您想要的功能和它将如何帮助项目。