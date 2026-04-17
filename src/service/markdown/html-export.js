const fs = require("fs")
const os = require("os")
const path = require("path")
const URI = require("vscode").Uri
const { createOutline } = require("./outline")
const isDev = process.argv.indexOf('--type=extensionHost') >= 0;

/**
 * 获取图片的 MIME 类型
 */
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp',
        '.ico': 'image/x-icon',
    };
    return mimeTypes[ext] || 'image/png';
}

/**
 * 将 HTML 中的本地图片转换为 Base64 内嵌格式
 * @author RJ.Wang
 * @date 2026-04-17
 */
function embedLocalImages(html, basePath) {
    const $ = require("cheerio").load(html);
    $("img").each(function () {
        let src = $(this).attr("src");
        if (!src) return;

        // 跳过已经是 base64 或远程 URL 的图片
        if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) return;

        // 处理 file:// 协议
        let imgPath = src;
        if (imgPath.startsWith("file:///")) {
            imgPath = imgPath.replace("file:///", "/");
        } else if (imgPath.startsWith("file://")) {
            imgPath = imgPath.replace("file://", "");
        }

        // 相对路径转绝对路径
        if (!path.isAbsolute(imgPath)) {
            imgPath = path.resolve(basePath, imgPath);
        }

        // 解码 URL 编码
        imgPath = decodeURIComponent(imgPath);

        try {
            if (fs.existsSync(imgPath)) {
                const imageBuffer = fs.readFileSync(imgPath);
                const base64 = imageBuffer.toString("base64");
                const mime = getMimeType(imgPath);
                $(this).attr("src", `data:${mime};base64,${base64}`);
            }
        } catch (e) {
            console.warn("Failed to embed image: " + imgPath, e.message);
        }
    });
    return $.html();
}

export async function exportHtml(exportFilePath, data, basePath) {
    if (basePath) {
        data = embedLocalImages(data, basePath);
    }
    console.log("[pretty-md-pdf] Exported to file: " + exportFilePath)
    fs.writeFileSync(exportFilePath, data, "utf-8")
}

export async function exportDocx(exportFilePath, data) {
    console.log("[pretty-md-pdf] Exported to file: " + exportFilePath)
    const exportTask = await require("vscode-html-to-docx")(data, '', {}, '');
    const buffer = Buffer.from(await exportTask.arrayBuffer());
    fs.writeFileSync(exportFilePath, buffer)
}

/*
 * export a html to a pdf file
 */
export async function exportByType(filePath, data, type, config) {

    console.log("[pretty-md-pdf] Exporting (" + type + ") ...")
    const originPath = path.parse(filePath)
    let targetFilePath = originPath.dir + "/" + originPath.name + "." + type

    // export html
    if (type == "html") {
        exportHtml(targetFilePath, data, originPath.dir)
        return
    } else if (type == "docx") {
        return exportDocx(targetFilePath, data)
    }

    let tmpfilename = path.join(isDev ? originPath.dir : os.tmpdir(), originPath.name + "_tmp.html")
    exportHtml(tmpfilename, data)
    let options = {
        executablePath: config["executablePath"] || undefined
    }

    const puppeteer = require("puppeteer-core")
    let browser = await puppeteer.launch(options).catch(error => {
        showErrorMessage("puppeteer.launch()", error)
    })
    let page = await browser.newPage().catch(error => {
        showErrorMessage("browser.newPage()", error)
    });
    await page.goto(URI.file(tmpfilename).toString(), { waitUntil: "networkidle0" }).catch(error => {
        showErrorMessage("page.goto()", error)
    });

    // generate pdf
    if (type == "pdf") {
        // https://pptr.dev/api/puppeteer.pdfoptions
        const options = {
            format: config["format"] || "A4",
            printBackground: config["printBackground"] || true,
            margin: {
                top: config["margin"]["top"],
                right: config["margin"]["right"],
                bottom: config["margin"]["bottom"],
                left: config["margin"]["left"]
            }
        }
        const pdf = await page.pdf(options).catch(error => {
            showErrorMessage("page.pdf", error)
        })

        const pdfBytes = await createOutline(pdf, data)
        fs.writeFileSync(targetFilePath, pdfBytes)

    }

    await browser.close()

    // delete temporary file
    let debug = config["debug"] || false
    if (!debug) {
        if (isExistsPath(tmpfilename)) {
            fs.unlink(tmpfilename, () => { })
        }
    }

    console.log("[pretty-md-pdf] Exported to file: " + targetFilePath)

}

function showErrorMessage(msg, error) {
    if (!error) return;
    console.error("ERROR: " + msg)
    console.log("ERROR: " + msg)
    if (error) {
        console.error(error.toString())
        console.log(error)
    }
}

function isExistsPath(path) {
    if (path.length === 0) {
        return false
    }
    try {
        fs.accessSync(path)
        return true
    } catch (error) {
        console.warn(error.message)
        return false
    }
}