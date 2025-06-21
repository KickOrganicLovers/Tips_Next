import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest){

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    try {
        const watchHistories = await prisma.watchHistory.findMany({
            where: {
                userId: userId as string,
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
        return NextResponse.json({watchHistories: replaceAllDatesToIsoString(watchHistories), error: null}, {status: 200})
    }catch (error){
        return NextResponse.json({watchHistories: null, error: error}, {status: 400})
    }

}
