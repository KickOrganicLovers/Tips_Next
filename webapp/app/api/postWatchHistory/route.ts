import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function POST(req: NextRequest) {
    const body =  await req.json()
    const session = await getServerSession(authOptions)

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。", code: 'UNAUTHORIZED'}},
        {status: 400}
    );


    try {
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date()
        endOfDay.setHours(23, 59, 59, 999)

        const watchHistory = await prisma.$transaction(async (tx) => {
            //今日の履歴を取得。設計上では一つだがprismaの関係上配列で渡される。uniqueではないのでupsertは使えない。
            const previousWatchHistory = await tx.watchHistory.findMany({
                where: {
                    articleId: body.articleId,
                    userId: session.user.id,
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    }
                }
            })

            //今日の履歴が存在する場合は日付をupdate、上記の通りpreviousWatchHistoryはlength1の配列だから基本的に[0]で処理を行っているが、例外処理も必要。ただし未実装。
            if(!!previousWatchHistory && previousWatchHistory.length > 0){
                return tx.watchHistory.update({
                    where: {
                        ...previousWatchHistory[0]
                    },
                    data: {
                        createdAt: new Date()
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
                                likes: true,
                                watchHistories: true,
                                category: true,
                            }
                        }
                    }
                });
            }
            else {
                return tx.watchHistory.create({
                    data: {
                        articleId: body.articleId,
                        userId: session.user.id,
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
                                likes: true,
                                watchHistories: true,
                                category: true,
                            }
                        }
                    }
                });
            }
        })

        return NextResponse.json({watchHistory: replaceAllDatesToIsoString(watchHistory)}, {status: 200})
    }catch (error){
        return handleServerError(error)
    }
}
