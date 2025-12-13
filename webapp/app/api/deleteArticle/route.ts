import {NextRequest, NextResponse} from "next/server";
import {deleteImage, extractImageUrls, extractKeyFromUrl, handleServerError} from "@/lib/lib-server/processing";
import {prisma} from "@/lib/lib-server/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";
import {meili} from "@/lib/lib-server/meili";


export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions)
    const body = await req.json();
    const index = meili.index('articles')

    if(!session || !session.user.id) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400});

    if (!body.id) return NextResponse.json(
        {error: '記事のidを送信してください。', code: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 }
    );


    try {

        const imageUrlsInArticle = extractImageUrls(body.contents);
        imageUrlsInArticle.push(body.thumbnailImageUrl)

        // 記事削除処理
        const article = await prisma.article.delete({
            where: {
                id: body.id,
                authorId: session.user.id,
            },
        });

        if(!article) return NextResponse.json(
            {error: {message: '記事が見つかりませんでした。', code: 'ARTICLE_NOT_FOUND'}},
            {status: 400}
        )

        // 画像削除処理
        imageUrlsInArticle.map(async (imageUrl) => {
            const key = extractKeyFromUrl(imageUrl);
            if (key) {
                await deleteImage(key);
            }
        })

        //検索サーバーからも記事を削除
        await index.deleteDocument(article.id)

        return NextResponse.json(null, { status: 200 });

    } catch (error) {
        return handleServerError(error)
    }
}




