import {getServerSession} from "next-auth/next";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {meili} from "@/lib/lib-server/meili";
import {authOptions} from "@/lib/lib-server/auth";
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET () {

    const session = await getServerSession(authOptions)
    const index = meili.index('users')

    if(!session || !session.user.id) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400});

    try {
        const emailOnVerifying = await prisma.emailOnVerifying.findUnique({
            where: {
                usedBy_email: {
                    usedBy: 'deleteUser',
                    email: session.user.email
                },
                verified: true
            }
        })

        if(!emailOnVerifying) return NextResponse.json(
            {error: {message: '認証済みのメールアドレスが見つかりませんでした。', code: 'EMAIL_NOT_FOUND'}},
            {status: 400}
        )

        const user = await prisma.user.delete({
            where: {
                id: session.user.id
            }
        })

        if (!user) return NextResponse.json(
            {error: {message: 'ユーザーが見つかりませんでした', code: 'USER_NOT_FOUND'}},
            {status: 400}
        )

        await index.deleteDocument(user.id)

        return NextResponse.json(null, {status: 200})

    }catch(error) {
        return handleServerError(error)
    }
}
