import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";
import {meili} from "@/lib-server/meili";

export async function GET() {
    const index = meili.index('articles')
    try{
        const articles = await prisma.article.findMany({
            include: {
                likes: true,
                watchHistories: true,
                category: true,
            }
        })

        const documents = articles.map(article => ({
            id: article.id,
            title: article.title,
            contents: article.contents,
            category: article.category.categoryName,
            tags: article.tags,
            likes: article.likes.length,
            watchHistories: article.watchHistories.length
        }))

        await index.addDocuments(documents)

        return NextResponse.json({isInitialized: true, error: null})
    }catch (error){
        return NextResponse.json({isInitialized: false, error: error})
    }
}
