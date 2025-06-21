import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {meili} from "@/lib/lib-server/meili";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    const index = meili.index('users')

    const session = await getServerSession(authOptions)
    if(!session || !session.user.id) return NextResponse.json({updatedUser: undefined, error: 'You must authenticate yourself before update profile'});

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

        if (updatedUser) {


            const document = {
                id: updatedUser.id,
                username: updatedUser.name,
                introduction: updatedUser.introduction
            }
            console.log(document)
            try{await index.addDocuments([document])}catch(err){console.log(err)}


            return NextResponse.json({updatedUser: replaceAllDatesToIsoString(updatedUser), error: undefined}, {status: 200})
        } else {
            return NextResponse.json({updatedUser: undefined, error: 'user not found'}, {status: 400})
        }


    } catch (error) {
        console.error(error)
        return NextResponse.json({updatedUser: undefined, error: error}, {status: 500})
    }

}
