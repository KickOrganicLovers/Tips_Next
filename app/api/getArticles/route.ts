import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/lib-server/prisma";

export async function GET (req: NextRequest){

    const { searchParams } = new URL(req.url);

    // クエリパラメータ "id" を取得
    const id = searchParams.get("id");
    console.log(id);

    // 数値に変換（クエリパラメータは string 型なので）
    const articleId = id ? parseInt(id, 10) : undefined;

    try{
        const articles = await prisma.$transaction(async (tx) => {
            const articlesWithoutAuthorName = await tx.article.findMany({
                where: !!articleId ? {id: articleId} : {}
            })
            const articles = articlesWithoutAuthorName.map(async (articleWithoutAuthorName) => {
                const user = await tx.userProfile.findUnique({
                    where: {
                        userId: articleWithoutAuthorName.authorId
                    }
                })
                return {
                    ...articleWithoutAuthorName,
                    authorName: !!user ? user.username : null,
                    authorProfileImageUrl: !!user? user.profileImageUrl : null
                }
            })

            return await Promise.all(articles)
        })
        console.log(articles)
        return NextResponse.json({articles: articles, error: undefined}, {status: 200})
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
