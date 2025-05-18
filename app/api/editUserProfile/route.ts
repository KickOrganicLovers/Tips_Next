import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const updatedUserProfile = await prisma.userProfile.update({
            where: {
                userId: body.userId,
            },
            data: {
                username: body.username,
                profileImageUrl: body.profileImageUrl,
                introduction: body.introduction,
                ...(body.profileImageUrl !== undefined && {profileImageUrl: body.profileImageUrl}),
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
            return NextResponse.json({updatedUserProfile: replaceAllDatesToIsoString(updatedUserProfile), error: undefined}, {status: 200})
        } else {
            return NextResponse.json({updatedUserProfile: undefined, error: 'user not found'}, {status: 400})
        }


    } catch (error) {
        console.error(error)
        return NextResponse.json({updatedUserProfile: undefined, error: error}, {status: 500})
    }

}
