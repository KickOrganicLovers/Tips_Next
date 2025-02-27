import {NextRequest, NextResponse} from "next/server";
import {extractBase64Images, extractImageUrls, extractKeyFromUrl} from "@/app/lib-server/processing";
import {prisma} from "@/app/lib-server/prisma";
import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {s3} from "@/app/lib-server/s3";



export async function POST(req: NextRequest) {
    console.log('this is delete article')
    try {
        const body = await req.json();
        console.log(body)

        const deleteImage = async (key: string) => {
            try {
                const deleteParams = {
                    Bucket: "tipsimgcontainer",
                    Key: key,
                };

                const command = new DeleteObjectCommand(deleteParams);
                const response = await s3.send(command);

                if (response.$metadata.httpStatusCode === 204) {
                    console.log(`Image deleted successfully: ${key}`);
                    return true;
                } else {
                    console.warn(`Unexpected response while deleting image: ${key}`, response);
                    return false;
                }
            } catch (error) {
                console.error(`Failed to delete S3 object: ${key}`, error);
                return false;
            }
        };



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
            console.log('this is fuck')
            const key = extractKeyFromUrl(imageUrl);
            console.log(`key: ${key}`)
            if (key) {
                try {
                    console.log(key)
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




