import {NextRequest, NextResponse} from "next/server";
import {meili} from "@/lib/lib-server/meili";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest){
    const body: {viewingArticleIds: string[], searchQuery: string} = await req.json()
    const searchQuery = body.searchQuery || ''
    const viewingArticleIds = body.viewingArticleIds || []

    try {
        const index = meili.index('articles')

        const searchResults = await index.search(searchQuery, {
            attributesToRetrieve: ['id']
        })

        const articleIds = searchResults.hits.map((hit) => hit.id)

        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    {id: {in: articleIds}}
                ],
                NOT: [{
                    id: {in: viewingArticleIds}
                }]
            },
            take: 30,
            include: {
                author: true,
                likes: true,
                watchHistories: true,
                category: true
            }
        })

        return NextResponse.json({articles}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }
}
