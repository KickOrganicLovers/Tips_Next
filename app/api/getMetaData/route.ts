import {NextRequest, NextResponse} from "next/server";
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const targetUrl = searchParams.get("targetUrl")

    if(!targetUrl) return NextResponse.json({metadata: null, error: 'Missing URL'})

    try {
        const res = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            }
        });

        const html = await res.text()
        const $ = cheerio.load(html);

        const getMeta = (name: string) =>
            $(`meta[property="${name}"]`).attr('content') ||
            $(`meta[name="${name}"]`).attr('content') || ''

        return Response.json({
            metadata: {
                url: targetUrl,
                title: getMeta('og:title') || $('title').text(),
                description: getMeta('og:description'),
                thumbnailImageUrl: getMeta('og:image'),
            },
            error: null,
        })


    }catch(err){
        return NextResponse.json({metadata: null, error: 'Invalid URL'})
    }
}
