---
inclusion: auto
---

# Office Viewer Enhanced 项目指南

**作者**: RJ.Wang (wangrenjun@gmail.com)  
**更新时间**: 2026-04-17

---

## 项目基本信息

- **名称**: vscode-office-enhanced
- **发布者**: rjwang
- **Marketplace**: https://marketplace.visualstudio.com/items?itemName=rjwang.vscode-office-enhanced
- **仓库**: https://github.com/rjwang1982/vscode-office.git
- **分支**: main

---

## 构建与发布

### 环境注意事项

- 本机没有安装 `yarn`，所有脚本使用 `npm` 运行
- `package.json` 中 `vscode:prepublish` 已改为 `npm run build`
- 本机没有 Node.js `canvas` 模块，图形生成用 SVG + `rsvg-convert` 转 PNG
- `rsvg-convert` 已安装在 `/opt/homebrew/bin/rsvg-convert`

### 发布流程

```bash
# 1. 构建
npm run build

# 2. 打包（仅打包不发布）
npx @vscode/vsce package --no-dependencies

# 3. 发布到 Marketplace
npx @vscode/vsce publish --no-dependencies
```

### 发布注意事项

- 发布前必须升版本号（`package.json` 中的 `version`），否则会报 `already exists` 错误
- PAT (Personal Access Token) 已缓存在 `~/.vsce`，无需每次输入
- 发布者账号: `rjwang`
- 发布命令会自动触发 `vscode:prepublish` 脚本执行构建

### 版本号规范

- 修复/小改动: patch (x.x.+1)
- 新功能: minor (x.+1.0)
- 重大变更: major (+1.0.0)

---

## Logo 相关

- 当前 logo: `images/logo-new.png`（绿色文件夹 + "E" + 文档图标）
- SVG 源文件: `images/logo-new.svg`
- 原版 logo 备份: `images/logo.png`（蓝色文件夹 + "A"）
- SVG 转 PNG 命令: `rsvg-convert -w 512 -h 512 input.svg -o output.png`

---

## 多语言 README

- `README.md` — English（主文档）
- `README-CN.md` — 简体中文
- `README-TW.md` 已删除（v3.6.2）

---

## Git 提交规范

- `feat:` 新功能
- `fix:` 修复
- `chore:` 杂项（版本号、配置等）
- `docs:` 文档更新
