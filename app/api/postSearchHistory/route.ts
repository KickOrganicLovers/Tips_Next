import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {meili} from "@/lib/lib-server/meili";
import crypto from 'crypto'

export async function POST(req: NextRequest){
    const body = await req.json()

    if(!!body.userId && !!body.searchQuery){
        try{
            const searchHistory = await prisma.searchHistory.upsert({
                where: {
                    userId_searchQuery: {
                        userId: body.userId as string,
                        searchQuery: body.searchQuery as string,
                    }
                },
                create: {
                    userId: body.userId as string,
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



            return NextResponse.json({error: null}, {status: 200})
        }catch (error){
            return NextResponse.json({error: error}, {status: 400})
        }
    }else {
        return NextResponse.json({error: 'missing essential parameters'}, {status: 400})
    }
}
