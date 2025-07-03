import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/lib-server/prisma";
import {meili} from "@/lib/lib-server/meili";
import {now} from "next-auth/client/_utils";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const index = meili.index('users')
    const email = body !== undefined && body.email !== undefined && typeof body.email === 'string' ? body.email as string : ''
    const username = body !== undefined && body.username !== undefined && typeof body.username === 'string' ? body.username as string : ''
    const password = body !== undefined && body.password !== undefined && typeof body.password === 'string' ? body.password as string : ''

    try {
        const emailOnVerifying = await prisma.emailOnVerifying.findUnique({
            where: {
                usedBy_email: {
                    usedBy: 'signup',
                    email
                },
                verified: true
            }
        })

        if(!emailOnVerifying) return NextResponse.json(
            {error: {message: '認証されたメールアドレスが見つかりませんでした。', code: 'EMAIL_NOT_FOUND'}},
            {status: 400})

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: bcrypt.hashSync(password, Number(process.env["BCRYPT_SALT_ROUNDS"])),
                name: username,
                image: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/initial-profile.jpeg',
                introduction: '',
                accounts: {
                    create: {
                        type: 'credentials',
                        provider: 'credentials',
                        providerAccountId: email,
                    }
                }
            },
        });


        const document = {
            id: newUser.id,
            username: newUser.name,
            introduction: newUser.introduction
        }
        await index.addDocuments([document])

        return NextResponse.json(null, {status: 200})

    } catch (error) {
        return handleServerError(error)
    }

}
