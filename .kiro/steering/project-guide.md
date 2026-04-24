---
inclusion: auto
---

# Office Viewer Enhanced 项目指南

**作者**: RJ.Wang (wangrenjun@gmail.com)
**更新时间**: 2026-04-24

---

## 项目基本信息

- **名称**: vscode-office-enhanced
- **发布者**: rjwang
- **VS Code Marketplace**: https://marketplace.visualstudio.com/items?itemName=rjwang.vscode-office-enhanced
- **Open VSX Registry**: https://open-vsx.org/extension/rjwang/vscode-office-enhanced
- **GitHub Releases**: https://github.com/rjwang1982/vscode-office/releases
- **仓库**: https://github.com/rjwang1982/vscode-office.git
- **分支**: main

---

## ⚠️ 关键架构约束（必读）

### Vditor 构建规则

Vditor 源码在 `vditor/` submodule 中（指向 `rjwang1982/vditor`）。

```bash
cd vditor && npm run build && cd ..
cp vditor/dist/index.min.js resource/vditor/vditor.js
```

**🔴 严禁**：不要复制 `vditor/dist/js/mermaid/mermaid.min.js` 到 `resource/vditor/dist/`！
- `vditor/dist/js/mermaid/` 下是旧版 mermaid（833KB）
- `resource/vditor/dist/js/mermaid/mermaid.min.js` 是我们自己放的 Mermaid v11.14.0（3.1MB）
- 覆盖会导致所有 mermaid 图表渲染异常

### 文件修改权限

| 文件 | 修改方式 | 说明 |
|------|----------|------|
| `resource/vditor/index.js` | 直接编辑 | 编辑器初始化、emoji、editorMode |
| `resource/vditor/util.js` | 直接编辑 | 工具栏按钮配置 |
| `resource/vditor/vditor.js` | **必须从源码构建** | 修改 `vditor/src/` 后 `npm run build` |
| `resource/vditor/lute.min.js` | **不可修改** | Go 编译产物，需 Go 环境 |
| `resource/vditor/dist/js/mermaid/mermaid.min.js` | 独立替换 | 当前 v11.14.0 |

### Lute 不可替换

Lute 是 Vditor 的 Markdown 解析引擎，与 Vditor 深度耦合（83 处引用，27 个专用 API）。
- 不能换成 markdown-it 或其他解析器
- emoji 字典不完整时，通过 `index.js` 的 `hint.emoji` 配置注入缺失项
- Lute 是 Go 编译成 JS 的，无法直接修改 `lute.min.js`

### Mermaid 渲染

- 使用 `mermaid.run()` API（不是已废弃的 `mermaid.init()`）
- 修改在 `vditor/src/ts/markdown/mermaidRender.ts`
- 预览模式自动点击预览按钮会破坏 mermaid 渲染状态，**不要用这种方式实现默认预览模式**

### Vditor Submodule

- **我们的 fork**: https://github.com/rjwang1982/vditor
- **上游原始**: https://github.com/vscode-ext-studio/vditor（cweijan 维护）
- **Vditor 原始项目**: https://github.com/Vanessa219/vditor（已不活跃）
- 同步上游：`git -C vditor fetch upstream`

---

## 构建与发布

### 环境注意事项

- 本机没有安装 `yarn`，所有脚本使用 `npm` 运行
- `package.json` 中 `vscode:prepublish` 已改为 `npm run build`
- Open VSX Token 通过环境变量 `OVSX_PAT` 配置（在 `~/.bash_profile` 和 `~/.zshrc` 中）

### 完整发布流程

```bash
# 1. 如果修改了 vditor 源码
cd vditor && npm run build && cd ..
cp vditor/dist/index.min.js resource/vditor/vditor.js
# ⚠️ 不要复制 vditor/dist/js/mermaid/

# 2. 更新版本号和 CHANGELOG
# package.json version + CHANGELOG.md

# 3. 提交推送
git add -A && git commit && git push origin main

# 4. 发布三个平台
npx vsce publish --no-dependencies                    # VS Code Marketplace
npx vsce package --no-dependencies                    # 生成 .vsix
npx ovsx publish *.vsix                               # Open VSX（读取 OVSX_PAT 环境变量）
gh release create vX.Y.Z *.vsix --title "vX.Y.Z"     # GitHub Releases
```

### 发布注意事项

- 发布前**必须**升版本号，否则报 `already exists`
- 三个平台版本号保持一致
- `.vsix` 文件在 `.gitignore` 中，不会提交到 git

### 版本号规范

- 修复/小改动: patch (x.x.+1)
- 新功能: minor (x.+1.0)
- 重大变更: major (+1.0.0)

---

## 包体积管理

当前包大小约 5.25MB。大文件（不可缩减）：
- `mermaid.min.js` 3.0MB — Mermaid v11.14.0
- `lute.min.js` 2.9MB — Lute 解析引擎

`.vscodeignore` 已排除：`test/`、`image/`、`promo/`、`vditor/`、开发配置文件等。
`.gitignore` 已排除：`test/`、`image/`、`promo/`、`*.vsix`。

---

## 多语言 README

- `README.md` — English（主文档，Marketplace 显示）
- `README-CN.md` — 简体中文（git 中保留，不打包到 vsix）

---

## 开发日志

详细的修改记录、踩坑经验和架构说明见 `DEVELOPMENT_LOG.md`。

---

## Git 提交规范

- `feat:` 新功能
- `fix:` 修复
- `chore:` 杂项（版本号、配置、清理等）
- `docs:` 文档更新
