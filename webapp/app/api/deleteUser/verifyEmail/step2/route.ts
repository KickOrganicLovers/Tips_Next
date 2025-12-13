import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {getServerSession} from "next-auth/next";
import {now} from "next-auth/client/_utils";
import bcrypt from "bcryptjs";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const session = await getServerSession()

    //sessionが存在するか確認。
    if(!session || !session.user.email) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}
        }, {status: 400}
    )

    try {
        const emailOnVerifying = await prisma.emailOnVerifying.findUnique({
            where: {
                usedBy_email: {
                    usedBy: 'deleteUser',
                    email: session.user.email,
                },
                verified: false
            },
        })
        if(!emailOnVerifying) return NextResponse.json(
            {error: {message: 'メールアドレスが見つかりませんでした。', code: 'EMAIL_NOT_FOUND'}},
            {status: 400}
        )

        if(bcrypt.compareSync(body.token, emailOnVerifying.hashedToken)) {

            if(emailOnVerifying.expiration < new Date()) return NextResponse.json(
                {error: {message: 'このトークンの有効期限は切れています。', code: 'EXPIRED_TOKEN'}},
                {status: 400})

            await prisma.emailOnVerifying.update({
                where: {
                    usedBy_email:{
                        usedBy: 'deleteUser',
                        email: session.user.email
                    }
                },
                data: {
                    verified: true
                }
            })

            return NextResponse.json(null, {status: 200})
        }else {
            return NextResponse.json(
                {error: {message: 'トークンが間違っているか、存在しません。', code: 'INCORRECT_TOKEN'}},
                {status: 400}
            )
        }
    }catch(error) {
        return handleServerError(error)
    }
}
