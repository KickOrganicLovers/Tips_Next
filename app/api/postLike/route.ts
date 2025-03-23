import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";

export async function POST(req: NextRequest){
    const body = await req.json()
    console.log(body)
    try {
        if(!body.like){
            const like = await prisma.like.create({
                data: {
                    articleId: body.articleId as string,
                    userId: body.userId as string,
                },
                include: {
                    article: {
                        include: {
                            authorProfile: {
                                include: {
                                    followers: true,
                                }
                            },
                            likes: true,
                            watchHistories: true,
                            category: true
                        }
                    }
                }
            })
            return NextResponse.json({like: replaceAllDatesToIsoString(like), error: null}, {status: 200})
        }else {
            const like = await prisma.like.delete({
                where: {
                    userId_articleId: {
                        userId: body.userId as string,
                        articleId: body.articleId as string,
                    }
                }
            })
            return NextResponse.json({like: like, error: null}, {status: 200})
        }

    }catch (error){
        console.error('prisma error' + error)
        return NextResponse.json({like: undefined, error: error}, {status: 400})
    }
}
