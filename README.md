# Office Viewer (Fork)

> Forked from [cweijan/vscode-office](https://github.com/cweijan/vscode-office), maintained by [RJ.Wang](mailto:wangrenjun@gmail.com).

## What's improved in this fork

- **HTML export with embedded images** — Local images are automatically converted to Base64 and embedded in the exported HTML file. Share a single `.html` file with anyone, all images display correctly without external dependencies
- **Smaller package size** — Removed bundled Icon Theme and Java Decompiler (~4.4 MB saved), keeping the extension focused on office file viewing
- Mermaid upgraded from v8.8.0 to v11.14.0 — new diagram syntax now renders correctly
- Mermaid loaded locally instead of CDN, better offline support
- Replaced deprecated `markdown-it-mermaid` with a lightweight built-in plugin
- Mermaid diagrams and document content aligned to left (instead of center)
- Removed dead code and fixed typos across the codebase

## Introduction

English | [简体中文](README-CN.md) | [繁體中文](README-TW.md)

This extension supports previewing these common office file formats in VS Code.

- Excel: .xls, .xlsx, .csv
- Word: .docx
- Svg: .svg
- Pdf: .pdf
- Font: .ttf, .otf, .woff, .woff2
- Markdown: .md
- HttpRequest: .http
- Windows Reg: .reg
- Compressed file: .zip, .jar, .vsix, .rar

## Markdown

This extension changes the default markdown editor to the vditor. **Please note that this editor is no longer actively maintained.**

If you want to use the original vscode editor, insert this in your `settings.json`.

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

Right-click in the editor to export markdown to PDF, DOCX or HTML. PDF export requires Chromium, configurable via `vscode-office.chromiumPath`.

When exporting to HTML, all local images are automatically embedded as Base64 — the exported file is fully self-contained and can be shared directly without losing any images.

![Markdown Editor Screenshot](image/README-CN/screenshot.png)

Shortcuts: Base on [Vditor shortcuts](shortcut.md) and more:

- Move list up: `Ctrl Alt I` / `⌘ ^ I`
- Move list down: `Ctrl Alt J` / `⌘ ^ J`
- Edit in VS Code: `Ctrl Alt E` / `⌘ ^ E`

Tips:

- Resize editor via ctrl/cmd+mouse scroll.
- Hyperlinks can be opened by ctrl/meta+click or double-click.

## HTML

The html editor supports live viewing.   Press ctrl+shift+v to open the live view.

## Credits

- PDF rendering: [mozilla/pdf.js/](https://github.com/mozilla/pdf.js/)
- Docx rendering: [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX rendering:
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs): XLSX parsing
  - [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet): XLSX rendering
- HTTP: [Rest  Client](https://github.com/Huachao/vscode-restclient)
- Markdown: [Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- Mermaid diagrams: [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
