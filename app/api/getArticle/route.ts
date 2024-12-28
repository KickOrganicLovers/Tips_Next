import {NextRequest, NextResponse} from "next/server";
import {read} from "@/mongo/mongoController";
import {ArticleScheme} from "@/typs";

export async function GET(req: NextRequest) {
    console.log('this is from getArticle')
    try {
        const val = await read<ArticleScheme>()
        return NextResponse.json(val)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
}
