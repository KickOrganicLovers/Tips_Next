import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const prisma = new PrismaClient()

    const email = body !== null && body.email !== null && typeof body.email === 'string' ? body.email as string : ''
    const password = body !== null && body.password !== null && typeof body.password !== 'string' ? body.password as string : ''


    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if(user !== null){
            if(bcrypt.compareSync(password, user.password)){
                return NextResponse.json({
                    isLoggedIn: true,
                    error: null,
                    userStatus: {
                        id: user.id,
                        username: user.name,
                        profileImageUrl: user.profileImageUrl,
                        introduction: user.introduction
                    }
                }, {status: 200})
            }else {
                return NextResponse.json({isLoggedIn: false, error: 'password is incorrect', userStatus: null}, {status: 403} )
            }
        }else {
            return NextResponse.json({isLoggedIn: false, error: 'email is incorrect', userStatus: null}, {status: 403})
        }
    }catch (err){
        return NextResponse.json({isLoggedIn: false, error: err, userStatus: null}, {status: 403})
    }
}
