import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";
import {handleServerError, shuffle} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId") || '';
    const session = await getServerSession(authOptions)

    try {
        if(!articleId) return NextResponse.json(
            {error: {message: '記事IDが不足しています。', code: 'MISSING_REQUIRED_FIELDS'}},
            {status: 400}
        )

        const articleOnReading = await prisma.article.findUnique({
            where: {
                id: articleId,
            },
            include: {
                tags: true,
            }
        })

        if(!articleOnReading) return NextResponse.json(
            {error: {message: '記事が見つかりませんでした。', code: 'ARTICLE_NOT_FOUND'}},
            {status: 400}
        )

        const relatedArticles = await prisma.article.findMany({
            where: {
                NOT:[
                    { id: articleId },
                    ...(session?.user?.id
                        ? [{ watchHistories: { some: { userId: session.user.id } } }]
                        : [])
                ],
                OR: [
                    {tags: {some: {id : {in: articleOnReading.tags.map(tag => tag.id)}}}},
                    {categoryId: articleOnReading.categoryId}
                ]
            },
            take: 12,
            orderBy: [
                {likes: {_count: 'desc'}},
                {createdAt: 'desc'}
            ],
            include: {
                author: true,
                category: true,
                tags: true,
                likes: true,
                watchHistories: true,
            }
        })

        if(relatedArticles.length < 12){
            if(!!session && !!session.user.id){
                const additionalRelatedArticles = await prisma.article.findMany({
                    where: {
                        NOT: { id: {in:[...articleId, ...relatedArticles.map(relatedArticle => relatedArticle.id)]}},
                        OR: [
                            {tags: {some: {id : {in: articleOnReading.tags.map(tag => tag.id)}}}},
                            {categoryId: articleOnReading.categoryId}
                        ]
                    },
                    take: 12 - relatedArticles.length,
                    orderBy: [
                        {likes: {_count: 'desc'}},
                        {createdAt: 'asc'}
                    ],
                    include: {
                        author: true,
                        category: true,
                        tags: true,
                        likes: true,
                        watchHistories: true,
                    }
                })

                if([...relatedArticles, ...additionalRelatedArticles].length < 12){
                    const trendingArticles = await prisma.article.findMany({
                        where: {
                            NOT: { id: {in:[...articleId, ...relatedArticles.map(relatedArticle => relatedArticle.id), ...additionalRelatedArticles.map(additionalRelatedArticle => additionalRelatedArticle.id)]}},
                        },
                        orderBy: [
                            {likes: {_count: 'desc'}},
                            {createdAt: 'desc'}
                        ],
                        take: 12 - [...relatedArticles, ...additionalRelatedArticles].length,
                        include: {
                            author: true,
                            category: true,
                            tags: true,
                            likes: true,
                            watchHistories: true,
                        }
                    })
                    return NextResponse.json({articles: shuffle([...relatedArticles, ...additionalRelatedArticles, ...trendingArticles])}, {status: 200})
                }else{
                    return NextResponse.json({articles: shuffle([...relatedArticles, ...additionalRelatedArticles])}, {status: 200})
                }
            }else {
                const trendingArticles = await prisma.article.findMany({
                    where: {
                        NOT: { id: {in:[...articleId, ...relatedArticles.map(relatedArticle => relatedArticle.id)]}},
                    },
                    orderBy: [
                        {likes: {_count: 'desc'}},
                        {createdAt: 'desc'}
                    ],
                    take: 12 - [...relatedArticles].length,
                    include: {
                        author: true,
                        category: true,
                        tags: true,
                        likes: true,
                        watchHistories: true,
                    }
                })
                return NextResponse.json({articles: shuffle([...relatedArticles, ...trendingArticles])}, {status: 200})
            }
        }else {
            return NextResponse.json({articles: shuffle(relatedArticles)}, {status: 200})
        }
    }catch (error){
        return handleServerError(error)
    }
}
