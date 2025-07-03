import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";
import crypto from 'crypto';
import bcrypt from 'bcryptjs'
import VerificationEmailTemplate from "@/app/api/signup/verifyEmail/step1/verificationEmailTemplate";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {

    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await req.json()

    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!!user) return NextResponse.json({error: {message: 'ユーザーが既に存在します。', code: 'USER_ALREADY_EXISTS'}}, {status: 403})

    const token = crypto.randomInt(100000, 999999).toString()

    try {
        await prisma.emailOnVerifying.upsert(
            {
                where: {
                    usedBy_email: {
                        email,
                        usedBy: 'signup'
                    }
                },
                create: {
                    usedBy: 'signup',
                    email: email,
                    hashedToken: bcrypt.hashSync(token, Number(process.env["BCRYPT_SALT_ROUNDS"])),
                    expiration: new Date(Date.now() + 10 * 60 * 1000),
                    verified: false
                },
                update: {
                    hashedToken: bcrypt.hashSync(token, Number(process.env["BCRYPT_SALT_ROUNDS"])),
                    expiration: new Date(Date.now() + 10 * 60 * 1000),
                    verified: false
                }
            }
        )


        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello World',
            react: VerificationEmailTemplate({email: email, token: token})
        })

        return NextResponse.json(null, {status: 200})

    } catch (error) {
        return handleServerError(error)
    }
}
