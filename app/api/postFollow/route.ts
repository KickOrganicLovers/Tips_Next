import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";

export async function POST(req: NextRequest){
    const body = await req.json()
    console.log(body)
    try {
        if(!body.follow){
            const follow = await prisma.follow.create({
                data: {
                    following: body.following as string,
                    follower: body.follower as string,
                },
                include: {
                    followingWithProfile: true,
                    followerWithProfile: true,
                }
            })
            return NextResponse.json({follow: follow, error: null}, {status: 200})

        }else {
            const follow = await prisma.follow.delete({
                where: {
                    following_follower: {
                        following: body.following as string,
                        follower: body.follower as string,
                    }
                }
            })
            return NextResponse.json({follow: replaceAllDatesToIsoString(follow), error: null}, {status: 200})
        }

    }catch (error){
        console.error('prisma error' + error)
        return NextResponse.json({isPosted: false, error: error}, {status: 400})
    }
}
