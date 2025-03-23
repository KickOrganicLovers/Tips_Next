import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";

export async function GET (req: NextRequest){

    const { searchParams } = new URL(req.url);

    // クエリパラメータ "id" を取得
    const articleId = searchParams.get("articleId");
    const authorId = searchParams.get("authorId");


    try{
        const articles = await prisma.article.findMany({
            where: (() => {
                    if(!!articleId){
                        return {id: articleId}
                    }else if(!!authorId) {
                        return {authorId: authorId}
                    }
                }
            )(),
            include: {
                authorProfile: {
                    include: {
                        followers: true,
                        followings: true
                    }
                },
                likes: true,
                comments: {
                    include: {
                        userProfile: true,
                    },
                },
                watchHistories: true,
                category: true,
            }
        })

        return NextResponse.json({articles: replaceAllDatesToIsoString(articles), error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({articles: undefined, error: error}, {status: 400})
    }




    // try{
    //     const articles = await prisma.article.findMany()
    //     console.log(articles)
    //     return NextResponse.json({articles: articles, error: undefined}, {status: 200})
    // }catch(error){
    //     return NextResponse.json({articles: undefined, error: error}, {status: 400})
    // }
}
