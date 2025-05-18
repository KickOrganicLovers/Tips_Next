import {JSDOM} from "jsdom";
import cuid from "cuid";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/lib/lib-server/s3";
import {DeleteObjectCommand} from "@aws-sdk/client-s3";


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

export async function deleteImage(key: string) {
    try {
        const deleteParams = {
            Bucket: process.env.MINIO_BUCKET_NAME,
            Key: key,
        };

        const command = new DeleteObjectCommand(deleteParams);
        const response = await s3.send(command);

        if (response.$metadata.httpStatusCode === 204) {
            console.log(`Image deleted successfully: ${key}`);
        } else {
            console.warn(`Unexpected response while deleting image: ${key}`, response);
        }
    } catch (error) {
        console.error(`Failed to delete S3 object: ${key}`, error);
    }
};

export function replaceAllDatesToIsoString<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (obj instanceof Date) {
        return obj.toISOString() as T; // DateならISO文字列に変換
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => replaceAllDatesToIsoString(item)) as T;
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, replaceAllDatesToIsoString(value)])
    ) as T;
}

export async function replaceHtml(html: string, articleId: string) {
    const imagesInArticle = extractBase64Images(html)
    const imageUrlMappings = await Promise.all(imagesInArticle.map(async (imageAsBase64WithPrefix) => {
        const key = `articleImages/${articleId}/${cuid()}.jpeg`;
        const upload = new Upload({
            client: s3,
            params: {
                Bucket: 'tipsimagebucket',
                Key: key,
                Body: Buffer.from(imageAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                ContentType: 'image/jpeg',
            }
        }).on("httpUploadProgress", (progress) => {
            console.log(`Progress: ${progress.loaded}/${progress.total}`);
        })

        try {
            await upload.done();
            return {
                base64: imageAsBase64WithPrefix, // 元の Base64
                s3Url: `${process.env.MINIO_BUCKET_LINK}/${key}?${new Date().toISOString()}`
            };
        } catch (error) {
            console.error("Error uploading file:", error);
            return null;
        }

    }))
    const validMappings = imageUrlMappings.filter((mapping) => mapping !== null) as {
        base64: string;
        s3Url: string
    }[];

    console.log('fuck:' + replaceImageSrc(html, validMappings))
    return replaceImageSrc(html, validMappings)
}

export async function uploadThumbnail(articleId: string, thumbnailImageAsBase64: string) {
    //upload thumbnail
    const key = `articleImages/${articleId}/thumbnail/${cuid()}.jpeg`;
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: 'tipsimagebucket',
            Key: key,
            Body: Buffer.from(thumbnailImageAsBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
            ContentType: 'image/jpeg',
        }
    }).on("httpUploadProgress", (progress) => {
        console.log(`Progress: ${progress.loaded}/${progress.total}`);
    })
    await upload.done()
    return`${process.env.MINIO_BUCKET_LINK}/${key}?${new Date().toISOString()}`
}

export async function deleteUnusedImageTags(newHTML: string, previousHTML: string) {
    const newImageUrls = extractImageUrls(newHTML);
    const previousImageUrls = extractImageUrls(previousHTML);
    const unusedImageUrls = previousImageUrls.filter((imageUrl) => !newImageUrls.includes(imageUrl));

    const promise = unusedImageUrls.map(async (imageUrl) => {
        const key = extractKeyFromUrl(imageUrl)
        if(!!key){
            await deleteImage(key);
        }
    })

    await Promise.all(promise)
}
