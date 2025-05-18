import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest){
    const body = await req.json()
    console.log('body' + body)

    if(body.forWhat === 'article'){
        try {
            if(!body.like){
                const like = await prisma.likeForArticle.create({
                    data: {
                        articleId: body.articleId as string,
                        userId: body.userId as string,
                    },
                    include: {
                        article: {
                            include: {
                                authorProfile: {
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
                return NextResponse.json({like: replaceAllDatesToIsoString(like), error: null}, {status: 200})
            }else {
                await prisma.likeForArticle.delete({
                    where: {
                        userId_articleId: {
                            userId: body.userId as string,
                            articleId: body.articleId as string,
                        }
                    }
                })
                return NextResponse.json({like: undefined, error: undefined}, {status: 200})
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
                        userId: body.userId as string,
                    },
                    include: {
                        comment: true
                    }
                })
                return NextResponse.json({like: replaceAllDatesToIsoString(like), error: null}, {status: 200})
            }else {
                await prisma.likeForComment.delete({
                    where: {
                        userId_commentId: {
                            commentId: body.commentId as string,
                            userId: body.userId as string
                        }
                    }
                })
                return NextResponse.json({like: undefined, error: undefined}, {status: 200})
            }
        }catch (error) {
            console.error('prisma error' + error)
            return NextResponse.json({like: undefined, error: error}, {status: 400})
        }
    }
}
