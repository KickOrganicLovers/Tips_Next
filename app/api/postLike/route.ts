import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";

export async function POST(req: NextRequest){
    const body = await req.json()
    console.log(body)
    try {
        await prisma.like.create({
            data: {
                articleId: body.articleId as number,
                userId: body.userId as number,
            }
        })

        return NextResponse.json({isPosted: true, error: null}, {status: 200})
    }catch (error){
        console.error('prisma error' + error)
        return NextResponse.json({isPosted: false, error: error}, {status: 400})
    }
}
