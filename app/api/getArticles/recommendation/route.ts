import { authOptions } from "@/lib/lib-server/auth";
import { prisma } from "@/lib/lib-server/prisma";
import { getServerSession } from "next-auth";
import {shuffle} from '@/lib/lib-server/processing';
import {NextResponse} from "next/server";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET (){

    const session = await getServerSession(authOptions)

    try {
        if(!!session && !!session.user.id){
            const recentWatchHistories = await prisma.watchHistory.findMany({
                where: {
                    userId: session.user.id
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10,
                select: {
                    article: {
                        select: {
                            tags: true,
                            categoryId: true,
                        }
                    }
                }
            })


            const tagMappings: {[key: string]: number} = {}
            recentWatchHistories.forEach(watchHistory => {
                watchHistory.article.tags.forEach(tag => {
                    tagMappings[tag.id] = (tagMappings[tag.id] || 0) + 1
                })
            })
            const tagArray = Object.entries(tagMappings).map(([tagId, times]) => ({
                tagId, times
            })).sort((a, b) => a.times - b.times)

            const categoryMappings: {[key: string] : number} = {}
            recentWatchHistories.forEach(wachHistory => {
                categoryMappings[wachHistory.article.categoryId] = (categoryMappings[wachHistory.article.categoryId] || 0) + 1
            })
            const categoryArray = Object.entries(categoryMappings).map(([categoryId, times]) => ({
                categoryId, times
            })).sort((a,b) => a.times - b.times)

            const recommendedArticles =  await prisma.article.findMany({
                where:{
                    OR: [
                        {tags: {some: {id : {in: tagArray.map(tag => tag.tagId)}}}},
                        {categoryId: {in: categoryArray.map(category => category.categoryId)}}
                    ],
                    NOT: {
                        watchHistories: {some: {userId: session.user.id}}
                    }
                },
                orderBy: [
                    {likes: {_count: 'desc'}},
                    {createdAt: 'desc'}
                ],
                take: 24,
                include: {
                    author: true,
                    likes: true,
                    watchHistories: true,
                    tags: true,
                    category: true
                }
            })

            const trendingArticles = await prisma.article.findMany({
                where :{
                    NOT : [
                        {watchHistories: {some: {userId: session.user.id}}},
                        {id: {in: recommendedArticles.map(recommendedArticle => recommendedArticle.id)}}
                    ]
                },
                orderBy: [
                    {likes: {_count: 'desc'}},
                    {createdAt: 'desc'}
                ],
                take: 28 - recommendedArticles.length,
                include: {
                    author: true,
                    likes: true,
                    watchHistories: true,
                    tags: true,
                    category: true
                }
            })

            const newArticles = await prisma.article.findMany({
                where :{
                    NOT : [
                        {watchHistories: {some: {userId: session.user.id}}},
                        {id: {in: [...recommendedArticles.map(recommendedArticle => recommendedArticle.id), ...trendingArticles.map(trendingArticle => trendingArticle.id)]}}
                    ]
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 2,
                include: {
                    author: true,
                    likes: true,
                    watchHistories: true,
                    tags: true,
                    category: true
                }
            })

            const articlesToReturn = [...recommendedArticles, ...trendingArticles, ...newArticles]

            if(articlesToReturn.length < 30){
                const additionalArticles = await prisma.article.findMany({
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 30 - articlesToReturn.length,
                    include: {
                        author: true,
                        likes: true,
                        watchHistories: true,
                        tags: true,
                        category: true
                    }
                })

                return NextResponse.json({articles: shuffle([...articlesToReturn, ...additionalArticles])}, {status: 200})
            }

            return NextResponse.json({articles: shuffle(articlesToReturn)}, {status: 200})

        }else {

            const trendingArticles = await prisma.article.findMany({
                orderBy: [
                    {likes: {_count: 'desc'}},
                    {createdAt: 'desc'}
                ],
                take: 15,
                include: {
                    author: true,
                    likes: true,
                    watchHistories: true,
                    tags: true,
                    category: true
                }
            })

            const newArticles = await prisma.article.findMany({
                where:{
                    NOT: {id: {in: trendingArticles.map(trendingArticle => trendingArticle.id)}}
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 15,
                include: {
                    author: true,
                    likes: true,
                    watchHistories: true,
                    tags: true,
                    category: true
                }
            })
            return NextResponse.json({articles: shuffle([...trendingArticles, ...newArticles])}, {status: 200})
        }
    }catch (error){
        console.log(error)
        return handleServerError(error)
    }
}
