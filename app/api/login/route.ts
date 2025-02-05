import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()

    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const password = body !== undefined && body.password !== undefined && typeof body.password !== 'string' ? body.password as string : ''


    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                profile: true,
            }
        })

        if(user){
            if(bcrypt.compareSync(password, user.password)){
                return NextResponse.json({
                    isLoggedIn: true,
                    error: undefined,
                    userProfile: {
                        userId: user.id,
                        username: user.profile?.username,
                        profileImageUrl: user.profile?.profileImageUrl,
                        introduction: user.profile?.introduction
                    }
                }, {status: 200})
            }else {
                return NextResponse.json({isLoggedIn: false, error: 'password is incorrect', userProfile: undefined}, {status: 403} )
            }
        }else {
            return NextResponse.json({isLoggedIn: false, error: 'email is incorrect', userProfile: undefined}, {status: 403})
        }
    }catch (err){
        return NextResponse.json({isLoggedIn: false, error: err, userProfile: undefined}, {status: 403})
    }
}
