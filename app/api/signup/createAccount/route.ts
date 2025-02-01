import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const body = await req.json()

    const email = body !== null && body.email !== null && typeof body.email === 'string' ? body.email as string : ''
    const username = body !== null && body.username !== null && typeof body.username === 'string' ? body.username as string: ''
    const password = body !== null && body.password !== null && typeof body.password !== 'string' ? body.password as string : ''

    try{
        await prisma.user.create({
            data:{
                name: username,
                email: email,
                password: bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS)),
                profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/initial-profile.jpeg'
            }
        })
        return NextResponse.json({isCreated: true, error: null}, {status: 200})
    }catch(err){
        return NextResponse.json({isCreated: false, error: err}, {status: 403})
    }

}
