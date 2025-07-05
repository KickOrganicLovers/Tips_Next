import {NextRequest, NextResponse} from "next/server";
import {deleteUnusedImageTags, handleServerError, replaceHtml, uploadThumbnail} from "@/lib/lib-server/processing";
import {prisma} from "@/lib/lib-server/prisma";
import {meili} from "@/lib/lib-server/meili";
import cuid from "cuid";
import {ArticleSchemeWithPrefix} from "@/types";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";


export async function POST(req: NextRequest) {
    const body: {article: ArticleSchemeWithPrefix}  = await req.json()
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。",code: 'UNAUTHORIZED'}},
        {status: 400}
    );

    const article = {...body.article, authorId: session.user.id}

    const index_articles = meili.index('articles')
    const index_tags = meili.index('tags')

    try {
        const result = await prisma.$transaction(async (tx) => {

            const tagsPromise = article.tags.map(async (tag: string) => {
                const existingTag = await tx.tag.findUnique({
                    where: {tagName: tag},
                })
                if(!!existingTag){
                    return existingTag
                }else {
                    return tx.tag.create({
                        data: {
                            tagName: tag,
                        }
                    })
                }
            })

            const tags = await Promise.all(tagsPromise)


            if(!body.article.id || !body.article.previousContents){
                const articleId = cuid()
                const replacedContents = await replaceHtml(body.article.contents, articleId)
                const thumbnailImageUrl = !!body.article.thumbnailImageUrl && !body.article.thumbnailImageAsBase64 ? body.article.thumbnailImageUrl : await uploadThumbnail(articleId, body.article.thumbnailImageAsBase64 as string)

                const article = await tx.article.create({
                    data: {
                        id: articleId,
                        title: body.article.title,
                        contents: replacedContents,
                        thumbnailImageUrl: thumbnailImageUrl,
                        authorId: body.article.authorId,
                        categoryId: body.article.categoryId,
                        tags: {
                            connect: tags
                        }
                    },
                    include: {
                        likes: true,
                        category: true,
                        tags: {
                            include: {
                                articles: true
                            }
                        },
                        watchHistories: true,
                    }
                })

                return {article, isNew: true}

            }else {


                const replacedContents = await replaceHtml(body.article.contents, body.article.id)
                const thumbnailImageUrl = await uploadThumbnail(body.article.id, body.article.thumbnailImageAsBase64 as string)
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
                            connect: tags
                        }
                    },
                    include: {
                        likes: true,
                        category: true,
                        tags: {
                            include: {
                                articles: true,
                            }
                        },
                        watchHistories: true,
                    }
                })

                return {article, isNew: false}
            }
        })


        const document_article = {
            id: result.article.id,
            title: result.article.title,
            contents: result.article.contents,
            category: result.article.category.categoryName,
            tags: result.article.tags.map((tag) => tag.tagName),
            likes: result.article.likes.length,
            watchHistories: result.article.watchHistories.length
        }

        const document_tag = result.article.tags.map((tag) => ({
            id: tag.id,
            name: tag.tagName,
            popularity: tag.articles.length,
        }))


        await index_articles.addDocuments([document_article])
        await index_tags.addDocuments(document_tag)

        return NextResponse.json({article: result.article, isNew: result.isNew}, {status: 200})
    } catch (error) {
        handleServerError(error)
    }
}


