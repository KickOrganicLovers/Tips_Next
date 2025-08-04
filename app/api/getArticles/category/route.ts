import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {ArticleScheme} from "@/types";

export async function POST (req: NextRequest){
    const body: {viewingArticles: ArticleScheme[], categoryId: string} = await req.json()

    console.log(body)

    if(!body.categoryId) return NextResponse.json(
        {error: {message: 'Category id is missing.', code: 'MISSING_CATEGORY_ID' }},
        {status: 400}
    )

    try{
        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    {categoryId: body.categoryId}
                ],
                NOT: [{
                    id: {in: body.viewingArticles.map((viewingArticle) => viewingArticle.id)}
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
                categoryId: body.categoryId,
            }
        })


        return NextResponse.json({articleLength, articles: replaceAllDatesToIsoString(articles)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }

}
