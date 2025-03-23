import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";

export async function POST(req: NextRequest) {
    const body =  await req.json()

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
                    userId: body.userId,
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
                                authorProfile: {
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
                        userId: body.userId,
                    },
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
                                category: true,
                            }
                        }
                    }
                });
            }
        })

        return NextResponse.json({watchHistory: replaceAllDatesToIsoString(watchHistory), error: undefined}, {status: 200})
    }catch (error){
        return NextResponse.json({watchHistory: undefined, error: error}, {status: 400})
    }
}
