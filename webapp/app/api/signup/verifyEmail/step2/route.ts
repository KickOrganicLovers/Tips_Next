import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const token = body !== undefined && body.token !== undefined && typeof body.token === 'string' ? body.token as string : ''

    try {
        const emailOnVerifying = await prisma.emailOnVerifying.findUnique({
            where: {
                usedBy_email: {
                    usedBy: 'signup',
                    email: email,
                },
                verified: false,
            }
        })

        if(!emailOnVerifying) return NextResponse.json(
            {error: {message: 'メールアドレスが見つかりませんでした。', code: 'EMAIL_NOT_FOUND'}},
            {status: 400}
        )

        if(!bcrypt.compareSync(token, emailOnVerifying.hashedToken)) return NextResponse.json(
            {error: {message: 'トークンが間違っているか存在しません。', code: 'INCORRECT_TOKEN'}},
            {status: 400})

        if(emailOnVerifying.expiration < new Date()) return NextResponse.json(
            {error: {message: '有効期限の切れたトークンです。', code: 'EXPIRED_TOKEN'}},
            {status: 400})


        await prisma.emailOnVerifying.update({
            where: {
                usedBy_email: {
                    usedBy: 'signup',
                    email: emailOnVerifying.email,
                }
            },
            data: {
                verified: true
            }
        })

        return NextResponse.json(null, {status: 200})

    } catch (error) {
        handleServerError(error)
    }
}
