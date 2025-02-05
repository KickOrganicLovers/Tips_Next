import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
    console.log('this is from step 2')
    const prisma = new PrismaClient()
    const body = await req.json()
    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const token = body !== undefined && body.token !== undefined && typeof body.token === 'string' ? body.token as string : ''
    // const email = body.email
    // const token = body.token

    try{
        console.log(token)
        console.log(email)
        const data =  await prisma.emailOnVerifying.findUnique({
            where: {
                email: email
            }
        })
        if(data !== undefined){
            if(bcrypt.compareSync(token, data.hashedToken)){
                if(data.expiration > new Date()){
                    return NextResponse.json({isVerified: true, error: undefined}, {status: 200})
                }else {
                    return NextResponse.json({isVerified: false, error: 'this token is expired'}, {status: 403})
                }
            }else
                return NextResponse.json({isVerified: false, error: 'no match tokens in database'}, {status: 403})
        }else {
            return NextResponse.json({isVerified: false, error: 'no such email in database'}, {status: 403})
        }
    }catch(err){
        throw err
    }

}
