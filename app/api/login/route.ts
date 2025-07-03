import {NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。",code: 'UNAUTHORIZED'}},
        {status: 400}
    );


    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user.id
            },
            select: {
                id: true,
                name: true,
                image: true,
                introduction: true,
                comments: true,
                likesForArticle: {
                    include: {
                        article: {
                            include: {
                                author: {
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
                        following: true,
                    }
                },
                followers: true,
                watchHistories: {
                    include: {
                        article: {
                            include: {
                                author: {
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

        if (user) {
            return NextResponse.json({
                user: replaceAllDatesToIsoString(user),
            }, {status: 200})

        } else {
            return NextResponse.json({
                error: {
                    message: 'ユーザーが見つかりませんでした。',
                    code: 'USER_NOT_FOUND',
                }
            }, {status: 403})
        }
    } catch (error) {
        return handleServerError(error)
    }
}
