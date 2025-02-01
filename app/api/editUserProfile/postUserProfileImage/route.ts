import {NextRequest, NextResponse} from "next/server";
import {S3Client} from "@aws-sdk/client-s3";
import {Upload} from "@aws-sdk/lib-storage";

export async function POST(req: NextRequest) {
    console.log('this is from postUserProfileImage')
    const body = await req.json()

    const id = body.id
    const imgAsBase64WithPrefix = body.img
    const imgAsBase64 = imgAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, '')
    const imgAsBuffer = Buffer.from(imgAsBase64, 'base64')
    const S3ClientInput = {
        region: process.env.AWS_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        }
    }
    const client = new S3Client(S3ClientInput)

    const uploadFile = async ()  => {

        const upload = new Upload({
            client: client,
            params: {
                Bucket: 'tipsimgcontainer',
                Key: id + '-profile.jpeg',
                Body: imgAsBuffer,
                ContentType: 'image/jpeg'
            }
        })

        upload.on("httpUploadProgress", (progress) => {
            console.log(`Progress: ${progress.loaded}/${progress.total}`);
        })

        upload.done().then(() => {
            console.log('done')
            return NextResponse.json({
                profileImageUrl: `https://tipsimgcontainer.s3.${process.env.AWS_REGION as string}.amazonaws.com/${id + '-profile.jpeg'}?${new Date().toISOString()}`,
                error: null
            })
        }).catch((err) => {
            console.log("something went wrong")
            return NextResponse.json({
                profileImageUrl: null,
                error: err
            })
        })
    }

    await uploadFile()

}