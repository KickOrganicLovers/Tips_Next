import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    const body = await req.json()

    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const username = body !== undefined && body.username !== undefined && typeof body.username === 'string' ? body.username as string: ''
    const password = body !== undefined && body.password !== undefined && typeof body.password !== 'string' ? body.password as string : ''

    try{
        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email: email,
                    password: bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS)),
                },
            });

            const newProfile = await tx.userProfile.create({
                data: {
                    userId: newUser.id, // ✅ newUser が定義された後なのでエラーにならない
                    username: username,
                    profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/initial-profile.jpeg',
                    introduction: '',
                },
            });

            return {newUser, newProfile};
        })
        // await prisma.user.create({
        //     data:{
        //         username: username,
        //         email: email,
        //         password: bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS)),
        //         profileImageUrl: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/initial-profile.jpeg'
        //     }
        // })
        return NextResponse.json({isCreated: true, error: undefined}, {status: 200})
    }catch(err){
        return NextResponse.json({isCreated: false, error: err}, {status: 403})
    }

}
