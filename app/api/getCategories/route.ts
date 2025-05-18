import {NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";

export async function GET() {


    try {
        const categories = await prisma.category.findMany({
                where: {
                    parentId: null,
                },
                include: {
                    children: true,
                }
            }
        )
        return NextResponse.json({categories: categories, error: undefined}, {status: 200})
    } catch (error) {
        return NextResponse.json({categories: undefined, error: error}, {status: 400})
    }
}
