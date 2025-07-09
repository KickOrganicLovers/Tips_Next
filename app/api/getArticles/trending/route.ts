import {prisma} from "@/lib/lib-server/prisma";
import {NextResponse} from "next/server";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET(){
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay() + 1)
    startOfWeek.setHours(0, 0, 0, 0)

    try{
        const likeCountsThisWeek = await prisma.likeForArticle.groupBy({
            by: ['articleId'],
            where: {
                createdAt: { gte: startOfWeek }
            },
            _count: { articleId: true }
        })
        const watchCountsThisWeek = await prisma.watchHistory.groupBy({
            by: ['articleId'],
            where: {
                createdAt: { gte: startOfWeek }
            },
            _count: { articleId: true }
        })


        const likeMap = Object.fromEntries(likeCountsThisWeek.map(item => [item.articleId, item._count.articleId]))
        const watchMap = Object.fromEntries(watchCountsThisWeek.map(item => [item.articleId, item._count.articleId]))

        const articleIds = Array.from(new Set([
            ...Object.keys(likeMap),
            ...Object.keys(watchMap),
        ]))

        const trendingArticlesData = articleIds.map(id => {
            const likes = likeMap[id] ?? 0
            const watches = watchMap[id] ?? 0
            const score = likes * 2 + watches // 重みをつけたい場合
            return { id, likes, watches, score }
        }).sort((a, b) => b.score - a.score)

        const articles = await prisma.article.findMany({
            where: {
                id: { in: trendingArticlesData.slice(0, 10).map(item => item.id) }
            },
            take: 10,
            include: {
                author: true,
                tags: true,
                category: true,
                likes: true,
                watchHistories: true
            }
        })

        const rankedArticles = trendingArticlesData.map(data =>
            articles.find(article => article.id === data.id)
        ).filter(Boolean)

        return NextResponse.json({articles: rankedArticles}, {status: 200})

    }catch(error){
        return handleServerError(error)
    }
}
