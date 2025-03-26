import {NextRequest, NextResponse} from "next/server";
import {meili} from "@/lib-server/meili";
import {prisma} from "@/lib-server/prisma";

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
                authorProfile: true,
                likes: true,
                watchHistories: true,
                category: true
            }
        })

        return NextResponse.json({articles: articles, error: null}, {status: 200})
    }catch (error){
        return NextResponse.json({articles: null, error: error}, {status: 400})
    }
}
