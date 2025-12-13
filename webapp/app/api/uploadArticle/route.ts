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

    const articleWithPrefix: ArticleSchemeWithPrefix = {...body.article, authorId: session.user.id}

    const index_articles = meili.index('articles')
    const index_tags = meili.index('tags')

    try {
        const result = await prisma.$transaction(async (tx) => {

            const tagsPromise = articleWithPrefix.tags.map(async (tag: string) => {
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


            if(!articleWithPrefix.id || !articleWithPrefix.previousContents){
                const articleId = cuid()
                const replacedContents = await replaceHtml(articleWithPrefix.contents, articleId)
                const thumbnailImageUrl = !!articleWithPrefix.thumbnailImageUrl && !articleWithPrefix.thumbnailImageAsBase64 ? articleWithPrefix.thumbnailImageUrl : await uploadThumbnail(articleId, articleWithPrefix.thumbnailImageAsBase64 as string)

                const article = await tx.article.create({
                    data: {
                        id: articleId,
                        title: articleWithPrefix.title,
                        contents: replacedContents,
                        thumbnailImageUrl: thumbnailImageUrl,
                        authorId: articleWithPrefix.authorId,
                        categoryId: articleWithPrefix.categoryId,
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


                const replacedContents = await replaceHtml(articleWithPrefix.contents, articleWithPrefix.id)
                const thumbnailImageUrl = !!articleWithPrefix.thumbnailImageUrl && !articleWithPrefix.thumbnailImageAsBase64 ? articleWithPrefix.thumbnailImageUrl : await uploadThumbnail(articleWithPrefix.id, articleWithPrefix.thumbnailImageAsBase64 as string)
                await deleteUnusedImageTags(replacedContents, articleWithPrefix.previousContents)

                const article = await tx.article.update({
                    where: {
                        id: articleWithPrefix.id
                    },
                    data: {
                        title: articleWithPrefix.title,
                        contents: replacedContents,
                        thumbnailImageUrl: thumbnailImageUrl,
                        authorId: articleWithPrefix.authorId,
                        categoryId: articleWithPrefix.categoryId,
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
        if(error instanceof Error){
            return handleServerError(error)
        }
        else {
            return NextResponse.json({error: {message: 'Unknown error has occurred.', code: 'UNKNOWN'}},{status: 400})
        }
    }
}


