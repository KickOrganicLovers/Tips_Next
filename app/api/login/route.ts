import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    // クエリパラメータ "id" を取得
    const session = await getServerSession(authOptions);

    if(!session || !session.user.id) return NextResponse.json({userProfile: undefined});


    try {
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: session?.user.id
            },

            include: {
                likesForArticle: {
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
                likesForComment: true,
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
                    userProfile: replaceAllDatesToIsoString(userProfile),
                    error: null
                }, {status: 200})

        } else {
            return NextResponse.json({
                userProfile: undefined,
                error: 'email is incorrect',
            }, {status: 403})
        }
    } catch (error) {
        return NextResponse.json({userProfile: undefined, error: error}, {status: 403})
    }
}
