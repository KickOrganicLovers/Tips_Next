import { NextRequest, NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export async function POST(req: NextRequest) {
    console.log("this is from postUserProfileImage");

    try {
        const body = await req.json();

        if (!body.profileImageAsBase64 || !body.userId) {
            return NextResponse.json({
                profileImageUrl: undefined,
                error: "Missing required fields",
            }, { status: 400 });
        }

        const id = body.userId
        const imgAsBase64WithPrefix = body.profileImageAsBase64;
        const imgAsBase64 = imgAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, "");
        const imgAsBuffer = Buffer.from(imgAsBase64, "base64");

        const client = new S3Client({
            region: process.env.AWS_REGION as string,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            },
        });

        const upload = new Upload({
            client: client,
            params: {
                Bucket: "tipsimgcontainer",
                Key: `${id}-profile.jpeg`,
                Body: imgAsBuffer,
                ContentType: "image/jpeg",
            },
        });

        upload.on("httpUploadProgress", (progress) => {
            console.log(`Progress: ${progress.loaded}/${progress.total}`);
        });

        await upload.done();

        console.log("Upload done");

        return NextResponse.json({
            profileImageUrl: `https://tipsimgcontainer.s3.${process.env.AWS_REGION}.amazonaws.com/${id}-profile.jpeg?${new Date().toISOString()}`,
            error: undefined,
        });

    } catch (err) {
        console.error("Error uploading file:", err);

        return NextResponse.json({
            profileImageUrl: undefined,
            error: "Internal Server Error",
        }, { status: 500 });
    }
}
