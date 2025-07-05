import {NextRequest, NextResponse} from "next/server";
import {meili} from "@/lib/lib-server/meili";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('search_query') || '';

    try {
        const index = meili.index('articles')

        const searchResults = await index.search(query, {
            attributesToRetrieve: ['id']
        })

        const articleIds = searchResults.hits.map((hit) => hit.id)

        const articles = await prisma.article.findMany({
            where: {
                id: {in: articleIds},
            },
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
