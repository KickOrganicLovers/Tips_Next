import {NextRequest, NextResponse} from "next/server";
import {
    deleteUnusedImageTags,
    extractBase64Images,
    replaceHtml,
    replaceImageSrc,
    uploadThumbnail
} from "@/lib-server/processing";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/lib-server/s3";
import {prisma} from "@/lib-server/prisma";
import {meili} from "@/lib-server/meili";
import cuid from "cuid";
import {ArticleScheme, ArticleSchemeWithPrefix, TagScheme} from "@/types";



export async function POST(req: NextRequest) {
    const body: {article: ArticleSchemeWithPrefix}  = await req.json()
    console.log(body)

    const index = meili.index('articles')

    try {
        await prisma.$transaction(async (tx) => {


            const tagsPromise = body.article.tags.map(async (tag: string) => {
                const existingTag = await tx.tag.findUnique({
                    where: {tagName: tag}
                })
                if(!!existingTag){
                    return existingTag
                }else {
                    return tx.tag.create({
                        data: {
                            tagName: tag
                        }
                    })
                }
            })


            if(!body.article.id || !body.article.previousContents){
                const articleId = cuid()
                const replacedContents = await replaceHtml(body.article.contents, articleId)
                const thumbnailImageUrl = await uploadThumbnail(articleId, body.article.thumbnailImageAsBase64)

                const article = await tx.article.create({
                    data: {
                        id: articleId,
                        title: body.article.title,
                        contents: replacedContents,
                        thumbnailImageUrl: thumbnailImageUrl,
                        authorId: body.article.authorId,
                        categoryId: body.article.categoryId,
                        tags: {
                            connect: await Promise.all(tagsPromise)
                        }
                    },
                    include: {
                        likes: true,
                        category: true,
                        tags: true,
                        watchHistories: true,
                    }
                })

                const document = {
                    id: article.id,
                    title: article.title,
                    contents: article.contents,
                    category: article.category.categoryName,
                    tags: article.tags.map((tag) => tag.tagName),
                    likes: article.likes.length,
                    watchHistories: article.watchHistories.length
                }

                await index.addDocuments([document])

            }else {
                const replacedContents = await replaceHtml(body.article.contents, body.article.id)
                const thumbnailImageUrl = await uploadThumbnail(body.article.id, body.article.thumbnailImageAsBase64)
                await deleteUnusedImageTags(replacedContents, body.article.previousContents)

                const article = await tx.article.update({
                    where: {
                        id: body.article.id
                    },
                    data: {
                        title: body.article.title,
                        contents: replacedContents,
                        thumbnailImageUrl: thumbnailImageUrl,
                        authorId: body.article.authorId,
                        categoryId: body.article.categoryId,
                        tags: {
                            connect: await Promise.all(tagsPromise)
                        }
                    },
                    include: {
                        likes: true,
                        category: true,
                        tags: true,
                        watchHistories: true,
                    }
                })

                const document = {
                    id: article.id,
                    title: article.title,
                    contents: article.contents,
                    category: article.category.categoryName,
                    tags: article.tags.map((tag) => tag.tagName),
                    likes: article.likes.length,
                    watchHistories: article.watchHistories.length
                }
                await index.addDocuments([document])
            }
        })

        return NextResponse.json({isCreated: true, error: undefined}, {status: 200})
    } catch (error) {
        console.log('error' + error)
        return NextResponse.json({isCreated: false, error: error}, {status: 400})
    }
}


