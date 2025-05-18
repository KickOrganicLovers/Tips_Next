import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const postedComment = await prisma.comment.create({
            data: {
                userId: body.userId as string,
                articleId: body.articleId as string,
                contents: body.contents as string,
            },
            include: {
                likes: true,
                userProfile: true
            }
        })

        return NextResponse.json({postedComment: replaceAllDatesToIsoString(postedComment), error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({postedComment: undefined, error: error}, {status: 400})
    }
}
