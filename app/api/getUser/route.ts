import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

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
                followers: true,
                followings: true,
                // articleCreatedBy: {
                //     include: {
                //         likes: true,
                //         author: true,
                //         category: true,
                //     }
                // }
            }
        })

        if(!user) return NextResponse.json(
            {error: {message: 'ユーザーが見つかりませんでした。', code: 'USER_NOT_FOUND'}},
            {status: 400}
        )
        return NextResponse.json({user: replaceAllDatesToIsoString(user)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }
}
