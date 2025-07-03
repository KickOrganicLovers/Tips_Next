import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {meili} from "@/lib/lib-server/meili";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    const index = meili.index('users')

    const session = await getServerSession(authOptions)

    if(!session || !session.user.id) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400})

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: body.username,
                image: body.image,
                introduction: body.introduction,
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
                                category: true,
                            }
                        }
                    }
                },
                likesForComment: true,
                followers: true,
                followings: {
                    include: {
                        following: true
                    }
                },
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
                                category: true,
                            }
                        }
                    }
                }
            }
        })

        if (!updatedUser) return NextResponse.json(
            {error: {message: '更新が完了しませんでした。', code: 'UPDATE_FAILED'}},
            {status: 400})

        const document = {
            id: updatedUser.id,
            username: updatedUser.name,
            introduction: updatedUser.introduction
        }

        await index.addDocuments([document])

        return NextResponse.json({updatedUser: replaceAllDatesToIsoString(updatedUser)}, {status: 200})

    } catch (error) {
        return handleServerError(error)
    }
}
