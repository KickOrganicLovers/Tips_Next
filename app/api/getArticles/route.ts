import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function GET (req: NextRequest){

    const { searchParams } = new URL(req.url);

    // クエリパラメータ "id" を取得
    const articleId = searchParams.get("articleId");
    const authorId = searchParams.get("authorId");
    const tagName = searchParams.get("tagName");


    try{
        const articles = await prisma.article.findMany({
            where: (() => {
                    if(!!articleId){
                        return {id: articleId}
                    }else if(!!authorId) {
                        return {authorId: authorId}
                    }else if(!!tagName){
                        return {tags: {some: {tagName: tagName}}}
                    }
                }
            )(),
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

        return NextResponse.json({articles: replaceAllDatesToIsoString(articles)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }


}
