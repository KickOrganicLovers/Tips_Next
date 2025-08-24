import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {ArticleScheme} from "@/types";

export async function POST (req: NextRequest){
    const body: {viewingArticleIds: string[], categoryId: string} = await req.json()
    const categoryId = body.categoryId || ''
    const viewingArticleIds = body.viewingArticleIds || []


    if(!body.categoryId) return NextResponse.json(
        {error: {message: 'Category id is missing.', code: 'MISSING_CATEGORY_ID' }},
        {status: 400}
    )

    try{
        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    {categoryId: categoryId}
                ],
                NOT: [{
                    id: {in: viewingArticleIds}
                }]
            },
            take: 30,
            include: {
                author: {
                    include: {
                        followers: true,
                        followings: true
                    }
                },
                likes: true,
                comments: {
                    include: {
                        user: true,
                        likes: true,
                    },
                },
                watchHistories: true,
                category: true,
                tags: true,
            }
        })

        const articleLength = await prisma.article.count({
            where: {
                categoryId: categoryId,
            }
        })


        return NextResponse.json({articleLength, articles: replaceAllDatesToIsoString(articles)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }

}
