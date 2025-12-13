import {NextResponse} from "next/server";
import {prisma} from "@/lib/lib-server/prisma";
import {handleServerError} from "@/lib/lib-server/processing";

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
        return NextResponse.json({categories: categories}, {status: 200})
    } catch (error) {
        return handleServerError(error)
    }
}
