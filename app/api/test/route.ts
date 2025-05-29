import {getServerSession} from "next-auth/next";
import {meili} from "@/lib/lib-server/meili";
import {prisma} from "@/lib/lib-server/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest){
    const session = await getServerSession()

    await meili.deleteIndex('users')
    await meili.deleteIndex('articles')
    await meili.deleteIndex('tags')
    await meili.deleteIndex('search_history')

    return NextResponse.json({fuck: 'fuck'})
}
