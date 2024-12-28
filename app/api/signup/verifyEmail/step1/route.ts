import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import VerificationEmailTemplate from "@/app/api/signup/verifyEmail/step1/verificationEmailTemplate";

export async function POST(req: NextRequest) {
    console.log('fuck me')
    const prisma = new PrismaClient()
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await req.json()
    const email = body !== null && body.email !== null && typeof body.email === 'string' ? body.email as string : ''
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(user === null){
        const token = crypto.randomInt(100000, 999999).toString()
        console.log(typeof Number(process.env["BCRYPT_SALT_ROUNDS"]))
        const data = {
            email: email as string,
            hashedToken: bcrypt.hashSync(token, Number(process.env["BCRYPT_SALT_ROUNDS"])),
            expiration: new Date(Date.now() + 10 * 60 * 1000)
        }
        try {
            await prisma.emailOnVerifying.create({data: data})
            try{
                await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: email,
                    subject: 'Hello World',
                    react: VerificationEmailTemplate({email: email, token: token})
                })
                return NextResponse.json({isVerified: true, error: null}, {status: 200})
            }catch(err){
                return NextResponse.json({isVerified: false, error: err}, {status: 403})
            }

        }catch(err){
            return NextResponse.json({isVerified: false, error: err}, {status: 403})
        }
    }

    console.log(email)
}
