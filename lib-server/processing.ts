import {JSDOM} from "jsdom";


export function extractBase64Images(html: string) {
    const jsdom = new JSDOM()
    const parser = new jsdom.window.DOMParser()

    const doc = parser.parseFromString(html, "text/html");
    const images = Array.from(doc.querySelectorAll('img'));

    return images
        .map((img) => img.getAttribute('src'))
        .filter((src): src is string => !!src && src.startsWith('data:image/'))
}


export function extractImageUrls(html: string) {
    console.log('this is from extractImageUrls');
    const jsdom = new JSDOM()
    const parser = new jsdom.window.DOMParser()

    const doc = parser.parseFromString(html, "text/html");
    const images = Array.from(doc.querySelectorAll('img'));
    console.log(images)

    return images
        .map((img) => img.getAttribute('src'))
        .filter((src): src is string => !!src && src.startsWith('http://'))
}

export function extractKeyFromUrl(url: string) {
    try {
        const parsedUrl = new URL(url);
        const pathParts = parsedUrl.pathname.split('/');

        if (pathParts.length < 3) {
            console.error("Invalid MinIO URL format");
        }

        // MinIO は基本的にパス形式なので、バケット名をスキップしてキーを取得
        const [, , ...keyParts] = pathParts;
        return keyParts.join('/');
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}


export function replaceImageSrc(html: string, replacements: { base64: string; s3Url: string }[]) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const imgTags = document.querySelectorAll("img");

    imgTags.forEach((img) => {
        const src = img.getAttribute("src");
        const replacement = replacements.find(r => r.base64 === src);
        if (replacement) {
            img.setAttribute("src", replacement.s3Url);
        }
    });

    console.log(dom.serialize());

    return dom.window.document.body.innerHTML; // 変更後のHTMLを取得
}
