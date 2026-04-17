# Office Viewer (Fork)

> Fork 自 [cweijan/vscode-office](https://github.com/cweijan/vscode-office)，由 [RJ.Wang](mailto:wangrenjun@gmail.com) 维护。

## 本 Fork 的改进

- **HTML 导出图片内嵌** — 导出 HTML 时自动将本地图片转为 Base64 嵌入，生成的 `.html` 文件完全独立，发给别人直接打开即可看到所有图片
- **更小的安装包** — 移除了内置的 Icon Theme 和 Java 反编译器（节省约 4.4 MB），让扩展更专注于办公文件预览
- Mermaid 从 v8.8.0 升级到 v11.14.0，新版图表语法不再报错
- Mermaid 改为本地加载，不依赖 CDN，离线也能用
- 用轻量内置插件替换了已停更的 `markdown-it-mermaid`
- Mermaid 图表和文档内容默认靠左显示（不再居中）
- 清理死代码，修复多处拼写错误

## 介绍

本扩展支持在VS Code中预览以下常见的办公文件格式：

- Excel: .xls, .xlsx, .csv
- Word: .docx
- Svg: .svg
- Pdf: .pdf
- 字体: .ttf, .otf, .woff, .woff2
- Markdown: .md
- HTTP请求: .http
- Windows注册表: .reg
- 压缩文件: .zip, .jar, .vsix, .rar

## Markdown

集成[Vditor](https://github.com/Vanessa219/vditor)实现对markdown的所见即所得编辑, **注意这个编辑器不再积极维护**.

如果你需要使用原生markdown编辑器, 在vscode设置中增加以下配置.

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

在编辑器打开右键菜单可将markdown导出为pdf, docx或者html, pdf依赖于chromium, 可通过 `vscode-office.chromiumPath` 配置chromium浏览器路径.

导出 HTML 时，所有本地图片会自动转换为 Base64 内嵌到文件中。导出的 `.html` 文件完全独立，直接发给别人打开即可正常显示所有图片，无需附带图片文件。

![Markdown 编辑器截图](image/README-CN/screenshot.png)

快捷键: 基于[Vditor快捷键](shortcut.md)以及更多:

- 将列表上移一行: `Ctrl Alt I` / `⌘ ^ I`
- 将列表下移一行: `Ctrl Alt J` / `⌘ ^ J`
- 在VS Code中编辑: `Ctrl Alt E` / `⌘ ^ E`

## 其他功能

- Excel: 支持对xlsx, csv等excel文件进行预览和保存(注意xlsx保存会丢失格式, csv则不支持gbk中文)
- HTML: 编辑HTML的过程中按下ctrl+shift+v可实时预览.
- PDF: 支持直接预览pdf文件
- HTTP: 用于发送http请求, 由于REST Client本地请求有bug, 修改后进行集成.

## Credits

- PDF rendering: [mozilla/pdf.js/](https://github.com/mozilla/pdf.js/)
- Docx rendering: [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX rendering:
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs): XLSX parsing
  - [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet): XLSX rendering
- HTTP: [Rest  Client](https://github.com/Huachao/vscode-restclient)
- Markdown: [Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- Mermaid 图表: [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
