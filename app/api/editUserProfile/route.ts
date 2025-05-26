import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";
import {meili} from "@/lib/lib-server/meili";

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    const index = meili.index('users')

    try {
        const updatedUserProfile = await prisma.userProfile.update({
            where: {
                userId: body.userId,
            },
            data: {
                username: body.username,
                profileImageUrl: body.profileImageUrl,
                introduction: body.introduction,
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
                                category: true,
                            }
                        }
                    }
                },
                likesForComment: true,
                followers: true,
                followings: {
                    include: {
                        followingWithProfile: true
                    }
                },
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
                                category: true,
                            }
                        }
                    }
                }
            }
        })

        if (updatedUserProfile) {


            const document = {
                id: updatedUserProfile.userId,
                username: updatedUserProfile.username,
                introduction: updatedUserProfile.introduction
            }
            console.log(document)
            try{await index.addDocuments([document])}catch(err){console.log(err)}


            return NextResponse.json({updatedUserProfile: replaceAllDatesToIsoString(updatedUserProfile), error: undefined}, {status: 200})
        } else {
            return NextResponse.json({updatedUserProfile: undefined, error: 'user not found'}, {status: 400})
        }


    } catch (error) {
        console.error(error)
        return NextResponse.json({updatedUserProfile: undefined, error: error}, {status: 500})
    }

}
