import {getServerSession} from "next-auth/next";
import {Resend} from "resend";
import {prisma} from "@/lib/lib-server/prisma";
import {authOptions} from "@/lib/lib-server/auth";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import VerificationEmailTemplate from "@/app/api/signup/verifyEmail/step1/verificationEmailTemplate";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET () {

    const session = await getServerSession(authOptions);
    const resend = new Resend(process.env.RESEND_API_KEY)

    //sessionが存在するか確認。
    if(!session || !session.user.email) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400});

    //6桁のトークンを生成しサーバーに保管する用のhashを生成
    const token = crypto.randomInt(100000, 999999).toString()
    const hashedToken =  bcrypt.hashSync(token, Number(process.env["BCRYPT_SALT_ROUNDS"]))

    try {

         await prisma.emailOnVerifying.upsert({
             where: {
                 usedBy_email: {
                     email: session.user.email,
                     usedBy: 'deleteUser'
                 }
             },
             create: {
                 usedBy: 'deleteUser',
                 email: session.user.email,
                 hashedToken,
                 expiration: new Date(Date.now() + 10 * 60 * 1000),
                 verified: false
             },
             update: {
                 hashedToken,
                 expiration: new Date(Date.now() + 10 * 60 * 1000),
                 verified: false
             }
        })

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: session.user.email,
            subject: 'Verifying Before Delete Your Account',
            react: VerificationEmailTemplate({email: session.user.email, token})
        })

        return NextResponse.json(null, {status: 200});

    }catch (error) {
        return handleServerError(error)
    }
}
