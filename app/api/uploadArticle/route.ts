import {NextRequest, NextResponse} from "next/server";
import {extractBase64Images, replaceImageSrc} from "@/app/lib-server/processing";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/app/lib-server/s3";
import {prisma} from "@/app/lib-server/prisma";



export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        await prisma.$transaction(async (tx) => {
            const articleWithPrefix = await tx.article.create({
                data: {
                    title: '',
                    contents: '',
                    thumbnailImageUrl: '',
                    authorId: 0,
                    tags: [],
                    categoryId: 0,
                }
            })

            //upload images in article and replace image src in html
            const contents: string = body.contents
            const imagesInArticle = extractBase64Images(contents)
            const imageUrlMappings = await Promise.all(imagesInArticle.map(async (imageAsBase64WithPrefix, index) => {
                const key = `${articleWithPrefix.id}-${index}-article.jpeg`;
                const upload = new Upload({
                    client: s3,
                    params: {
                        Bucket: 'tipsimgcontainer',
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
                        s3Url: `https://tipsimgcontainer.s3.${process.env.AWS_REGION}.amazonaws.com/${key}?${new Date().toISOString()}`
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
            const replacedHtml = replaceImageSrc(contents, validMappings)


            //upload thumbnail
            const key = `${articleWithPrefix.id}-thumbnail.jpeg`;
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: 'tipsimgcontainer',
                    Key: key,
                    Body: Buffer.from(body.thumbnailImageAsBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                    ContentType: 'image/jpeg',
                }
            }).on("httpUploadProgress", (progress) => {
                console.log(`Progress: ${progress.loaded}/${progress.total}`);
            })
            await upload.done()
            const thumbnailImageUrl = `https://tipsimgcontainer.s3.${process.env.AWS_REGION}.amazonaws.com/${key}?${new Date().toISOString()}`

            const article = await tx.article.update({
                where: {
                    id: articleWithPrefix.id
                },
                data: {
                    title: body.title,
                    contents: replacedHtml,
                    thumbnailImageUrl: thumbnailImageUrl,
                    authorId: body.authorId,
                    tags: body.tags,
                    categoryId: body.categoryId,
                }
            })
        })

        return NextResponse.json({isCreated: true, error: undefined}, {status: 200})
    } catch (error) {
        return NextResponse.json({isCreated: false, error: error}, {status: 400})
    }
}


    //記事内の画像をs3にアップロードし、それと同時にurlを取得。
    // const imageUrlMappings = await Promise.all(imagesInArticle.map(async (imageAsBase64WithPrefix, index) => {
    //     const imageAsBase64 = imageAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, "")
    //     const imageAsBuffer = Buffer.from(imageAsBase64, "base64")
    //     const key = `${body.authorId}-${index}-article.jpeg`;
    //     const upload = new Upload({
    //         client: s3,
    //         params: {
    //             Bucket: 'tipsimgcontainer',
    //             Key: key,
    //             Body: imageAsBuffer,
    //             ContentType: 'image/jpeg',
    //         }
    //     }).on("httpUploadProgress", (progress) => {
    //         console.log(`Progress: ${progress.loaded}/${progress.total}`);
    //     })
    //
    //     try {
    //         await upload.done();
    //         return {
    //             base64: imageAsBase64WithPrefix, // 元の Base64
    //             s3Url: `https://tipsimgcontainer.s3.${process.env.AWS_REGION}.amazonaws.com/${key}?${new Date().toISOString()}`
    //         };
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //         return null;
    //     }
    //
    // }))
    // const validMappings = imageUrlMappings.filter((mapping) => mapping !== null) as { base64: string; s3Url: string }[];
    // const replacedHtml = replaceImageSrc(contents, validMappings)


