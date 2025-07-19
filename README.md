# miniapp-kaiyun

开云集团内购小程序

## 安装使用

```bash
# 根目录以及miniprogram目录下安装依赖
npm install

# 全局安装依赖
npm install prettier typescript commitizen --global

# 需要在小程序开发工具里【工具】-【构建npm】
```

### commit 规范

git commit 的 message 遵循 [Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)：

```cmd
<commit 类型，不可省略>(<功能模块，可省略>): <功能内容，不可省略>
// 空一行
<详细内容，可省略>
// 空一行
<关闭Issue，此处可省略>
```

commit 类型包括：

- feat: 新功能（feature）
- fix: 修补 bug
- docs: 文档（documentation）
- style: 格式（不影响代码运行的变动）
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- 例如 feat: xxx功能

如果 commit 类型为`feat`和`fix`，则该 commit 将现在 CHANGELOG.md 之中。
