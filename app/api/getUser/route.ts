import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    // クエリパラメータ "id" を取得
    const userId = searchParams.get("userId");

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId as string,
            },
            select: {
                id: true,
                name: true,
                image: true,
                introduction: true,
                comments: true,
                likesForArticle: true,
                followers: true,
                followings: true,
                watchHistories: true,
                articleCreatedBy: {
                    include: {
                        likes: true,
                        author: true,
                        category: true,
                    }
                }
            }
        })
        return NextResponse.json({user: replaceAllDatesToIsoString(user), error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({user: undefined, error: error}, {status: 400})
    }
}
