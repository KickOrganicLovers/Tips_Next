import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {ArticleScheme} from "@/types";

export async function POST (req: NextRequest){
    const body: {viewingArticleIds: string[], tagName: string} = await req.json()
    const viewingArticleIds = body.viewingArticleIds || []
    const tagName = body.tagName || ''


    if(!body.tagName) return NextResponse.json(
        {error: {message: 'Category id is missing.', code: 'MISSING_CATEGORY_ID' }},
        {status: 400}
    )

    try{
        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    {tags: {some: {tagName: tagName}}}
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
            where:  {tags: {some: {tagName: tagName}}}
        })

        console.log(articles)

        return NextResponse.json({articleLength, articles: replaceAllDatesToIsoString(articles)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }

}
