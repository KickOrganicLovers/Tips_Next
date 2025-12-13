import {prisma} from "@/lib/lib-server/prisma";
import {NextResponse} from "next/server";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET(){
    const now = new Date()
    const sevenDaysAgo = new Date(now)
    sevenDaysAgo.setDate(now.getDate() - 3)

    try{
        const likeCountsThisWeek = await prisma.likeForArticle.groupBy({
            by: ['articleId'],
            where: {
                createdAt: { gte: sevenDaysAgo }
            },
            _count: true
        })
        const watchCountsThisWeek = await prisma.watchHistory.groupBy({
            by: ['articleId'],
            where: {
                createdAt: { gte: sevenDaysAgo }
            },
            _count: true
        })

        console.log(likeCountsThisWeek)

        console.log(watchCountsThisWeek)


        const likeMap = Object.fromEntries(likeCountsThisWeek.map(item => [item.articleId, item._count]))
        const watchMap = Object.fromEntries(watchCountsThisWeek.map(item => [item.articleId, item._count]))

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

        console.log(rankedArticles)

        return NextResponse.json({articles: rankedArticles}, {status: 200})

    }catch(error){
        return handleServerError(error)
    }
}
