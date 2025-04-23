import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib-server/auth";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    // クエリパラメータ "id" を取得
    const session = await getServerSession(authOptions);

    if(!session || !session.user.id) return NextResponse.json({isLoggedIn: false, error: 'session not found', userProfile: undefined });


    try {
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: session?.user.id
            },

            include: {
                likes: {
                    include: {
                        article: {
                            include: {
                                authorProfile: {
                                    include: {
                                        followers: true,
                                        followings: true
                                    }
                                },
                                likes: true,
                                watchHistories: true,
                                category: true
                            }
                        }
                    }
                },
                followings: {
                    include: {
                        followingWithProfile: true,
                    }
                },
                followers: true,
                watchHistories: {
                    include: {
                        article: {
                            include: {
                                authorProfile: {
                                    include: {
                                        followers: true,
                                        followings: true
                                    }
                                },
                                likes: true,
                                watchHistories: true,
                                category: true
                            }
                        }
                    }
                }
            }
        })

        if (userProfile) {
                return NextResponse.json({
                    isLoggedIn: true,
                    error: undefined,
                    userProfile: replaceAllDatesToIsoString(userProfile)
                }, {status: 200})

        } else {
            return NextResponse.json({
                isLoggedIn: false,
                error: 'email is incorrect',
                userProfile: undefined
            }, {status: 403})
        }
    } catch (err) {
        return NextResponse.json({isLoggedIn: false, error: err, userProfile: undefined}, {status: 403})
    }
}
