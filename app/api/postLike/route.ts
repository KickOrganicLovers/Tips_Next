import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";

export async function POST(req: NextRequest){
    const body = await req.json()
    console.log(body)
    try {
        if(!body.isLiked){
            await prisma.like.create({
                data: {
                    articleId: body.articleId as number,
                    userId: body.userId as number,
                }
            })
        }else {
            await prisma.like.delete({
                where: {
                    userId_articleId: {
                        userId: body.userId as number,
                        articleId: body.articleId as number,
                    }
                }
            })
        }

        return NextResponse.json({isPosted: true, error: null}, {status: 200})
    }catch (error){
        console.error('prisma error' + error)
        return NextResponse.json({isPosted: false, error: error}, {status: 400})
    }
}
