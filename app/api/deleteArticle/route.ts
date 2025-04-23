import {NextRequest, NextResponse} from "next/server";
import {deleteImage, extractBase64Images, extractImageUrls, extractKeyFromUrl} from "@/lib-server/processing";
import {prisma} from "@/lib-server/prisma";
import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {s3} from "@/lib-server/s3";



export async function POST(req: NextRequest) {
    console.log('this is delete article')
    try {
        const body = await req.json();
        console.log(body)


        if (!body.id) {
            return NextResponse.json(
                {isDeleted: false, error: "Invalid request: articleId and contents are required" },
                { status: 400 }
            );
        }

        const imageUrlsInArticle = extractImageUrls(body.contents);
        console.log(`imageurls ${imageUrlsInArticle}`)
        imageUrlsInArticle.push(body.thumbnailImageUrl)

        // 画像削除処理
        imageUrlsInArticle.map(async (imageUrl) => {
            const key = extractKeyFromUrl(imageUrl);
            if (key) {
                try {
                    await deleteImage(key);
                } catch (error) {
                    console.error(`Failed to delete image: ${imageUrl}`, error);
                }
            }
        })

        // 記事削除処理
        await prisma.article.delete({
            where: { id: body.id },
        });

        return NextResponse.json({isDeleted: true, error: ''}, { status: 200 });

    } catch (error) {
        console.error("Error in POST /api/delete-article", error);
        return NextResponse.json(
            { isDeleted: true, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}




