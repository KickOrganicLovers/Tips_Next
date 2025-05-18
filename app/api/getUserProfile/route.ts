import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    // クエリパラメータ "id" を取得
    const userId = searchParams.get("userId");

    try {
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: userId as string,
            },
            include: {
                likesForArticle: true,
                followers: true,
                followings: true,
                watchHistories: true,
                articleCreatedBy: {
                    include: {
                        likes: true,
                        authorProfile: true,
                        category: true,
                    }
                }
            }
        })
        return NextResponse.json({userProfile: replaceAllDatesToIsoString(userProfile), error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({userProfile: undefined, error: error}, {status: 400})
    }
}
