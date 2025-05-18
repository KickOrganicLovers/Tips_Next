import {NextRequest, NextResponse} from "next/server";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/lib/lib-server/s3";

export async function POST(req: NextRequest) {
    console.log("this is from postUserProfileImage");

    try {
        const body = await req.json();

        if (!body.profileImageAsBase64 || !body.userId) {
            return NextResponse.json({
                profileImageUrl: undefined,
                error: "Missing required fields",
            }, {status: 400});
        }

        const id = body.userId
        const imgAsBase64WithPrefix = body.profileImageAsBase64;
        const imgAsBase64 = imgAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, "");
        const imgAsBuffer = Buffer.from(imgAsBase64, "base64");


        const upload = new Upload({
            client: s3,
            params: {
                Bucket: process.env.MINIO_BUCKET_NAME,
                Key: `userProfileImages/${id}-profile.jpeg`,
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
            profileImageUrl: `${process.env.MINIO_BUCKET_LINK}/userProfileImages/${id}-profile.jpeg?${new Date().toISOString()}`,
            error: undefined,
        });

    } catch (err) {
        console.error("Error uploading file:", err);

        return NextResponse.json({
            profileImageUrl: undefined,
            error: "Internal Server Error",
        }, {status: 500});
    }
}
