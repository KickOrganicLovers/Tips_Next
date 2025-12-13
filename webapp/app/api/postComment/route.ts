import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。", code: 'UNAUTHORIZED'}},
        {status: 400}
    );

    try {
        const postedComment = await prisma.comment.create({
            data: {
                userId: session.user.id as string,
                articleId: body.articleId as string,
                contents: body.contents as string,
            },
            include: {
                user: true,
                likes: true,
            }
        })

        return NextResponse.json({postedComment: replaceAllDatesToIsoString(postedComment)}, {status: 200})

    }catch (error){
        return handleServerError(error)
    }
}
