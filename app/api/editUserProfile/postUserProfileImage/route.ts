import {NextRequest, NextResponse} from "next/server";
import {Upload} from "@aws-sdk/lib-storage";
import {s3} from "@/lib/lib-server/s3";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/lib-server/auth";
import {handleServerError} from "@/lib/lib-server/processing";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions)

        if(!session || !session.user.id) return NextResponse.json(
            {error: {message: 'ログインされていません。', code: 'UNAUTHORIZED'}},
            {status: 400});

        if (!body.profileImageAsBase64) return NextResponse.json(
            {error: {message: '画像が送信されていません。', code: 'MISSING_REQUIRED_FIELDS'}},
            {status: 400});


        const id = session.user.id;
        const imgAsBase64WithPrefix = body.profileImageAsBase64;
        const imgAsBase64 = imgAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, "");
        const imgAsBuffer = Buffer.from(imgAsBase64, "base64");


        const upload = new Upload({
            client: s3,
            params: {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `userImages/${id}-profile.jpeg`,
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
            profileImageUrl: `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_NAME}/userImages/${id}-profile.jpeg?${new Date().toISOString()}`,
        }, {status: 200});

    } catch (error) {
        console.log(error);
        return handleServerError(error);
    }
}
