import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { handleServerError } from "@/lib/lib-server/processing";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get("targetUrl");

    if (!targetUrl)
        return NextResponse.json(
            { error: { message: "URLが送信されていません。", code: "URL_NOT_FOUND" } },
            { status: 400 }
        );

    try {
        let metadata: {
            url: string;
            title: string;
            description: string;
            thumbnailImageUrl: string;
        };

        // ✅ YouTube 動画リンクかどうかを判定
        const isYouTubeVideo =
            /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(
                targetUrl
            );

        if (isYouTubeVideo) {
            // oEmbed API を叩く
            const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
                targetUrl
            )}&format=json`;

            const oembedRes = await fetch(oembedUrl);
            if (!oembedRes.ok) {
                return NextResponse.json(
                    { error: { message: "YouTube oEmbed API エラー", code: "OEMBED_ERROR" } },
                    { status: 400 }
                );
            }

            const data = await oembedRes.json();
            metadata = {
                url: targetUrl,
                title: data.title,
                description: "", // oEmbedには説明は含まれない
                thumbnailImageUrl: data.thumbnail_url,
            };
        } else {
            // ✅ 通常のURLは <meta> タグをスクレイピング
            const res = await fetch(targetUrl, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0 Safari/537.36",
                    "Accept-Language": "ja,en;q=0.9",
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                },
            });

            const html = await res.text();
            if (!html)
                return NextResponse.json(
                    { error: { message: "URLが存在しないか、指定したサイトに問題があります。" }, code: "URL_NOT_FOUND" },
                    { status: 400 }
                );

            const $ = cheerio.load(html);

            const getMeta = (name: string) =>
                $(`meta[property="${name}"]`).attr("content") ||
                $(`meta[name="${name}"]`).attr("content") ||
                "";

            metadata = {
                url: targetUrl,
                title: getMeta("og:title") || $("title").text(),
                description: getMeta("og:description"),
                thumbnailImageUrl: getMeta("og:image"),
            };
        }

        console.log(metadata);

        return NextResponse.json({
            metadata,
            error: null,
        });
    } catch (error) {
        return handleServerError(error);
    }
}
