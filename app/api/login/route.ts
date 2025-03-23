import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import {prisma} from "@/lib-server/prisma";
import {replaceAllDatesToIsoString} from "@/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const password = body !== undefined && body.password !== undefined && typeof body.password !== 'string' ? body.password as string : ''


    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },

            include: {
                profile: {
                    include: {
                        likes: {
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
                }
            }
        })

        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log(user)
                return NextResponse.json({
                    isLoggedIn: true,
                    error: undefined,
                    userProfile: replaceAllDatesToIsoString({
                        userId: user.id,
                        username: user.profile?.username,
                        profileImageUrl: user.profile?.profileImageUrl,
                        introduction: user.profile?.introduction,
                        likes: user.profile?.likes,
                        followings: user.profile?.followings,
                        followers: user.profile?.followers,
                        watchHistories: user.profile?.watchHistories,
                        createdAt: user.profile?.createdAt as Date
                    })
                }, {status: 200})
            } else {
                return NextResponse.json({
                    isLoggedIn: false,
                    error: 'password is incorrect',
                    userProfile: undefined
                }, {status: 403})
            }
        } else {
            return NextResponse.json({
                isLoggedIn: false,
                error: 'email is incorrect',
                userProfile: undefined
            }, {status: 403})
        }
    } catch (err) {
        return NextResponse.json({isLoggedIn: false, error: err, userProfile: undefined}, {status: 403})
    }
}
