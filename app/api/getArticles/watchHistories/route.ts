import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function GET(req: NextRequest){

    const session = await getServerSession(authOptions)

    if(!session || !session.user.id) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400});


    try {
        const watchHistories = await prisma.watchHistory.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                article: {
                    include: {
                        author: {
                            include: {
                                followers: true,
                                followings: true
                            }
                        },
                        likes: true
                    }
                }
            }
        })
        return NextResponse.json({watchHistories: replaceAllDatesToIsoString(watchHistories)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }

}
