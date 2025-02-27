import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/lib-server/prisma";

export async function GET (req: NextRequest){

    const { searchParams } = new URL(req.url);

    // クエリパラメータ "id" を取得
    const articleId = searchParams.get("articleId");
    const authorId = searchParams.get("authorId");

    // 数値に変換（クエリパラメータは string 型なので）
    const articleIdAsNum = articleId ? parseInt(articleId, 10) : undefined;
    const authorIdAsNum = authorId ? parseInt(authorId, 10) : undefined;

    try{
        const articlesWithAuthorProfile = await prisma.$transaction(async (tx) => {
            const articles = await tx.article.findMany({
                where: (() => {
                    if(!!articleIdAsNum){
                        return {id: articleIdAsNum}
                    }else if(!!authorIdAsNum) {
                        return {authorId: authorIdAsNum}
                    }
                })()
            })
            const articlesWithAuthorProfile = articles.map(async (article) => {
                const authorProfile = await tx.userProfile.findUnique({
                    where: {
                        userId: article.authorId
                    }
                })
                return {
                    article: article,
                    authorProfile: authorProfile,
                }
            })

            return await Promise.all(articlesWithAuthorProfile)
        })
        return NextResponse.json({articlesWithAuthorProfile: articlesWithAuthorProfile, error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({articlesWithAuthorProfile: undefined, error: error}, {status: 400})
    }




    // try{
    //     const articles = await prisma.article.findMany()
    //     console.log(articles)
    //     return NextResponse.json({articles: articles, error: undefined}, {status: 200})
    // }catch(error){
    //     return NextResponse.json({articles: undefined, error: error}, {status: 400})
    // }
}
