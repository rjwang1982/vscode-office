# Office Viewer (Fork)

> Fork 自 [cweijan/vscode-office](https://github.com/cweijan/vscode-office)，由 [RJ.Wang](mailto:wangrenjun@gmail.com) 維護。

## 本 Fork 的改進

- **HTML 匯出圖片內嵌** — 匯出 HTML 時自動將本地圖片轉為 Base64 嵌入，生成的 `.html` 檔案完全獨立，傳給別人直接開啟即可看到所有圖片
- Mermaid 從 v8.8.0 升級到 v11.14.0，新版圖表語法不再報錯
- Mermaid 改為本地載入，不依賴 CDN，離線也能用
- 用輕量內建插件替換了已停更的 `markdown-it-mermaid`
- Mermaid 圖表和文件內容預設靠左顯示（不再置中）
- 清理無用程式碼，修復多處拼寫錯誤

## 介紹

本擴充功能支援在VS Code中預覽以下常見的辦公檔案格式：

- Excel: .xls, .xlsx, .csv
- Word: .docx
- Svg: .svg
- Pdf: .pdf
- 字型: .ttf, .otf, .woff, .woff2
- Markdown: .md
- HTTP請求: .http
- Windows登錄檔: .reg
- 壓縮檔案: .zip, .jar, .vsix, .rar

## Markdown

整合[Vditor](https://github.com/Vanessa219/vditor)實現對markdown的所見即所得編輯, **注意這個編輯器不再積極維護**.

如果你需要使用原生markdown編輯器, 在vscode設定中增加以下配置.

```json
{
    "workbench.editorAssociations": {
        "*.md": "default",
        "*.markdown": "default"
    }
}
```

在編輯器開啟右鍵選單可將markdown匯出為pdf, docx或者html, pdf依賴於chromium, 可透過 `vscode-office.chromiumPath` 配置chromium瀏覽器路徑.

匯出 HTML 時，所有本地圖片會自動轉換為 Base64 內嵌到檔案中。匯出的 `.html` 檔案完全獨立，直接傳給別人開啟即可正常顯示所有圖片，無需附帶圖片檔案。

![Markdown 編輯器截圖](image/README-CN/screenshot.png)

快捷鍵: 基於[Vditor快捷鍵](shortcut.md)以及更多:

- 將清單上移一行: `Ctrl Alt I` / `⌘ ^ I`
- 將清單下移一行: `Ctrl Alt J` / `⌘ ^ J`
- 在VS Code中編輯: `Ctrl Alt E` / `⌘ ^ E`

## 其他功能

- 圖示主題: 內建了Material Icon Theme部分icon
- Excel: 支援對xlsx, csv等excel檔案進行預覽和儲存(注意xlsx儲存會丟失格式, csv則不支援gbk中文)
- HTML: 編輯HTML的過程中按下ctrl+shift+v可實時預覽.
- PDF: 支援直接預覽pdf檔案
- HTTP: 用於傳送http請求, 由於REST Client本地請求有bug, 修改後進行整合.

## Credits

- PDF rendering: [mozilla/pdf.js/](https://github.com/mozilla/pdf.js/)
- Docx rendering: [VolodymyrBaydalka/docxjs](https://github.com/VolodymyrBaydalka/docxjs)
- XLSX rendering:
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs): XLSX parsing
  - [myliang/x-spreadsheet](https://github.com/myliang/x-spreadsheet): XLSX rendering
- HTTP: [Rest  Client](https://github.com/Huachao/vscode-restclient)
- Markdown: [Vanessa219/vditor](https://github.com/Vanessa219/vditor)
- Mermaid 圖表: [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)
- Material Icon theme: [PKief/vscode-material-icon-theme](https://github.com/PKief/vscode-material-icon-theme)
