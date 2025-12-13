import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {authOptions} from "@/lib/lib-server/auth";
import {getServerSession} from "next-auth/next";

export async function POST(req: NextRequest){
    const body = await req.json()
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。", code: 'UNAUTHORIZED'}},
        {status: 400}
    );


    try {
        if(!body.follow){
            const follow = await prisma.follow.create({
                data: {
                    followingId: body.followingId as string,
                    followerId: session.user.id,
                },
                include: {
                    following: true,
                    follower: true,
                }
            })

            return NextResponse.json({follow: replaceAllDatesToIsoString(follow)}, {status: 200})

        }else {
            await prisma.follow.delete({
                where: {
                    id: body.follow.id as string,
                    followerId: session.user.id
                }
            })

            return NextResponse.json({follow: null}, {status: 200})
        }

    }catch (error){
        handleServerError(error)
    }
}
