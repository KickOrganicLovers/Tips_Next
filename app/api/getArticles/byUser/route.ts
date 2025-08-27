import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest){
    try {
        const body: {authorId: string, viewingArticleIds?: string[]} = await req.json();
        const authorId = body.authorId || ''
        const viewingArticleIds = body.viewingArticleIds || []

        if(!body.authorId) return NextResponse.json(
            {error: {message: 'Author id is missing.', code: 'MISSING_AUTHOR_ID' }},
            {status: 400}
        )

        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    {authorId}
                ],
                NOT: [
                    {id: {in: viewingArticleIds}}
                ]
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

        console.log(articles)

        return NextResponse.json({articles}, {status: 200})

    }catch (error){
        return handleServerError(error)
    }
}
