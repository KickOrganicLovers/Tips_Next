import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError, replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)
    const body = await req.json()

    if (!session || !session.user.id) return NextResponse.json(
        {error: {message: "ログインされていません。", code: 'UNAUTHORIZED'}},
        {status: 400}
    );


    if(body.forWhat === 'article'){
        try {
            if(!body.like){
                const like = await prisma.likeForArticle.create({
                    data: {
                        articleId: body.articleId as string,
                        userId: session.user.id as string,
                    },
                    include: {
                        article: {
                            include: {
                                author: {
                                    include: {
                                        followers: true,
                                    }
                                },
                                likes: true,
                                watchHistories: true,
                                category: true
                            }
                        }
                    }
                })
                return NextResponse.json({like: replaceAllDatesToIsoString(like)}, {status: 200})
            }else {
                await prisma.likeForArticle.delete({
                    where: {
                        userId_articleId: {
                            userId: session.user.id as string,
                            articleId: body.articleId as string,
                        }
                    }
                })
                return NextResponse.json({like: null}, {status: 200})
            }

        }catch (error){
            console.error('prisma error' + error)
            return NextResponse.json({like: undefined, error: error}, {status: 400})
        }
    }else if(body.forWhat === 'comment'){
        try {
            if(!body.like){
                const like = await prisma.likeForComment.create({
                    data: {
                        commentId: body.commentId as string,
                        userId: session.user.id as string,
                    },
                    include: {
                        comment: true
                    }
                })
                return NextResponse.json({like: replaceAllDatesToIsoString(like)}, {status: 200})
            }else {
                await prisma.likeForComment.delete({
                    where: {
                        userId_commentId: {
                            commentId: body.commentId as string,
                            userId: session.user.id as string
                        }
                    }
                })
                return NextResponse.json({like: null}, {status: 200})
            }
        }catch (error) {
            handleServerError(error)
        }
    }
}
