import {getServerSession} from "next-auth/next";
import {meili} from "@/lib/lib-server/meili";
import {prisma} from "@/lib/lib-server/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest){
    const session = await getServerSession()

    await meili.deleteIndex('users')

    return NextResponse.json({fuck: 'fuck'})
}
