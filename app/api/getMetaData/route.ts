import {NextRequest, NextResponse} from "next/server";
import * as cheerio from 'cheerio';
import {handleServerError} from "@/lib/lib-server/processing";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const targetUrl = searchParams.get("targetUrl")

    if(!targetUrl) return NextResponse.json(
        {error: {message: 'URLが送信されていません。', code: 'URL_NOT_FOUND'}},
        {status: 400}
    )

    try {
        const res = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0 Safari/537.36',
                'Accept-Language': 'ja,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
        });

        console.log(res)

        const html = await res.text()


        if(!html) return NextResponse.json(
            {error: {message: 'URLが存在しないか、指定したサイトに問題があります。'}, code: 'URL_NOT_FOUND'},
            {status: 400}
        )
        const $ = cheerio.load(html);

        const getMeta = (name: string) =>
            $(`meta[property="${name}"]`).attr('content') ||
            $(`meta[name="${name}"]`).attr('content') || ''

        const metadata = {
            url: targetUrl,
            title: getMeta('og:title') || $('title').text(),
            description: getMeta('og:description'),
            thumbnailImageUrl: getMeta('og:image'),
        }

        console.log(metadata)

        return Response.json({
            metadata: {
                url: targetUrl,
                title: getMeta('og:title') || $('title').text(),
                description: getMeta('og:description'),
                thumbnailImageUrl: getMeta('og:image'),
            },
            error: null,
        })


    }catch(error){
        console.log(error)
        return handleServerError(error)
    }
}
