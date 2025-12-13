import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {meili} from "@/lib/lib-server/meili";
import crypto from 'crypto'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)
    const body: {searchQuery: string} = await req.json()

    if(!session || !session.user.id) return NextResponse.json(
        {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
        {status: 400});

    if(!body.searchQuery) return NextResponse.json(
        null, {status: 200}
    )

    try{
        const searchHistory = await prisma.searchHistory.upsert({
            where: {
                userId_searchQuery: {
                    userId: session.user.id as string,
                    searchQuery: body.searchQuery as string,
                }
            },
            create: {
                userId: session.user.id as string,
                searchQuery: body.searchQuery as string,
            },
            update:{
                createdAt: new Date()
            }
        })

        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)

        const recentCount = await prisma.searchHistory.count({
            where: {
                searchQuery: body.searchQuery as string,
                createdAt: {gte: oneDayAgo}
            }
        })

        // await meili.index('search_history').updateFilterableAttributes(['query', 'popularity'])

        const document = {
            id: searchHistory.id,
            query: searchHistory.searchQuery,
            popularity: recentCount,
        }

        await meili.index('search_history').addDocuments([
            document
        ])



        return NextResponse.json(null, {status: 200})
    }catch (error){
        return handleServerError(error)
    }




}
