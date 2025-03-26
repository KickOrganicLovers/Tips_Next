import {NextRequest, NextResponse} from "next/server";
import {extractBase64Images, replaceImageSrc} from "@/lib-server/processing";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/lib-server/s3";
import {prisma} from "@/lib-server/prisma";
import {meili} from "@/lib-server/meili";



export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)

    try {
        await prisma.$transaction(async (tx) => {
            const articleWithPrefix = await tx.article.create({
                data: {
                    title: body.title,
                    contents: '',
                    thumbnailImageUrl: '',
                    authorId: body.authorId,
                    tags: body.tags,
                    categoryId: body.categoryId,
                }
            })

            //upload images in article and replace image src in html
            const contents: string = body.contents
            const imagesInArticle = extractBase64Images(contents)
            const imageUrlMappings = await Promise.all(imagesInArticle.map(async (imageAsBase64WithPrefix, index) => {
                const key = `articleImages/${articleWithPrefix.id}/${index}-inArticle.jpeg`;
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
            const replacedHtml = replaceImageSrc(contents, validMappings)


            //upload thumbnail
            const key = `articleImages/${articleWithPrefix.id}/thumbnail.jpeg`;
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: 'tipsimagebucket',
                    Key: key,
                    Body: Buffer.from(body.thumbnailImageAsBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                    ContentType: 'image/jpeg',
                }
            }).on("httpUploadProgress", (progress) => {
                console.log(`Progress: ${progress.loaded}/${progress.total}`);
            })
            await upload.done()
            const thumbnailImageUrl = `${process.env.MINIO_BUCKET_LINK}/${key}?${new Date().toISOString()}`

            const article = await tx.article.update({
                where: {
                    id: articleWithPrefix.id
                },
                data: {
                    contents: replacedHtml,
                    thumbnailImageUrl: thumbnailImageUrl,
                },
                include: {
                    category: true,
                    likes: true,
                    watchHistories: true,
                }
            })

            const index = meili.index('articles')

            const document = {
                id: article.id,
                title: article.title,
                contents: article.contents,
                category: article.category.categoryName,
                tags: article.tags,
                likes: article.likes.length,
                watchHistories: article.watchHistories.length
            }

            await index.addDocuments([document])
        })

        return NextResponse.json({isCreated: true, error: undefined}, {status: 200})
    } catch (error) {
        console.log('error' + error)
        return NextResponse.json({isCreated: false, error: error}, {status: 400})
    }
}


