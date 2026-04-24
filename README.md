# Office Viewer Enhanced

Preview Word, Excel, PDF, Markdown, and more directly in VS Code and Kiro. Export self-contained HTML with embedded images, and render modern Mermaid diagrams with Mermaid v11 support.

## Office Viewer (Fork)

> Forked from [cweijan/vscode-office](https://github.com/cweijan/vscode-office), maintained by [RJ.Wang](mailto:wangrenjun@gmail.com).

This extension is a maintained fork of the original project, with improvements focused on usability, portability, offline support, and package size.

## What's improved in this fork

- **Self-contained HTML export**
  - Local images are automatically converted to Base64 and embedded into exported HTML files
  - Share a single `.html` file without broken local image references
- **Smaller package size**
  - Removed the bundled Icon Theme and Java Decompiler to keep the extension focused on document viewing
  - Reduced package size by about 4.4 MB
- **Modern Mermaid support**
  - Upgraded Mermaid from v8.8.0 to v11.14.0
  - Newer Mermaid syntax renders correctly
  - Mermaid is loaded locally instead of from a CDN for better offline support
  - Replaced the deprecated `markdown-it-mermaid` dependency with a lightweight built-in integration
- **Cleaner rendering**
  - Markdown preview now fills the available editor width instead of wrapping too early
  - Mermaid diagrams and document content are left-aligned instead of centered
  - Removed dead code and fixed typos across the codebase

## Introduction

English | [简体中文](README-CN.md)

This extension supports previewing the following file types in VS Code:

- Excel: `.xls`, `.xlsx`, `.csv`
- Word: `.docx`
- SVG: `.svg`
- PDF: `.pdf`
- Fonts: `.ttf`, `.otf`, `.woff`, `.woff2`
- Markdown: `.md`
- HTTP requests: `.http`
- Windows Registry files: `.reg`
- Archive files: `.zip`, `.jar`, `.vsix`, `.rar`

## Markdown

This extension replaces the default Markdown editor with Vditor. Please note that Vditor is no longer actively maintained.

If you want to use the original VS Code editor, add the following to your `settings.json`:

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

Right-click in the editor to export Markdown to PDF, DOCX, or HTML. PDF export requires Chromium, which can be configured via `vscode-office.chromiumPath`.

When exporting to HTML, local images are automatically embedded as Base64, so the exported file is fully self-contained and can be shared directly without losing any images.

![Markdown Editor Screenshot](images/screenshot.png)

Keyboard shortcuts are based on [Vditor shortcuts](shortcut.md), with additional commands:

- Move list up: `Ctrl+Alt+I` / `⌘ ^ I`
- Move list down: `Ctrl+Alt+J` / `⌘ ^ J`
- Edit in VS Code: `Ctrl+Alt+E` / `⌘ ^ E`

Tips:

- Resize the editor with Ctrl/Cmd + mouse scroll
- Open hyperlinks with Ctrl/Meta + click or double-click

## HTML

The HTML editor supports live preview. Press `Ctrl+Shift+V` to open the live view.

## Acknowledgements

This project would not exist without the work of the following authors:

- **[cweijan](https://github.com/cweijan)** — Author of the original [vscode-office](https://github.com/cweijan/vscode-office) extension, which this fork is based on. Also maintains a [customized Vditor build](https://github.com/vscode-ext-studio/vditor) tailored for the extension.
- **[Vanessa219 (Liyuan Li)](https://github.com/Vanessa219)** — Author of [Vditor](https://github.com/Vanessa219/vditor), the browser-based Markdown WYSIWYG editor at the heart of this extension's Markdown editing experience. Developed under the [B3log](https://b3log.org) open-source community, licensed under MIT.

## Credits

- PDF rendering: [mozilla/pdf.js/](https://github.com/mozilla/pdf.js/)
- DOCX rendering: [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX rendering:
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs): XLSX parsing
  - [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet): XLSX rendering
- HTTP: [Rest Client](https://github.com/Huachao/vscode-restclient)
- Markdown: [Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- Mermaid diagrams: [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
