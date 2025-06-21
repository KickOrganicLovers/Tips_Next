import {NextRequest, NextResponse} from "next/server";
import {meili} from "@/lib/lib-server/meili";
import {prisma} from "@/lib/lib-server/prisma";

export async function GET (req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('search_query') || '';

    try {
        const index = meili.index('users')

        const searchResults = await index.search(query, {
        })


        const userIds = searchResults.hits.map((hit) => hit.id)
        const documents = await index.getDocuments()

        console.log(index)
        console.log(documents)
        console.log(searchResults.hits)
        console.log(userIds.length)
        console.log(userIds)

        const users = await prisma.user.findMany({
            where: {
                id: {in: userIds}
            },
            select: {
                id: true,
                name: true,
                image: true,
                introduction: true,
                followers: true,
                followings: true,
            }
        })

        return NextResponse.json({users, error: null}, {status: 200})

    }catch (error){
        return NextResponse.json({users: null, error}, {status: 400})
    }
}
