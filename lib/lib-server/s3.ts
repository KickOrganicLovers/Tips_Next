import { S3Client } from "@aws-sdk/client-s3";

const globalForS3 = globalThis as unknown as { s3?: S3Client };

export const s3: S3Client = globalForS3.s3 ?? new S3Client({
    endpoint: process.env.AWS_ENDPOINT,
    region: process.env.AWS_REGION, // MinIO は region の指定が不要だが、エラー回避のため設定
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    forcePathStyle: true, // Path-style アクセスを強制
});

// 開発環境では globalThis に保存して再生成を防ぐ
if (process.env.NODE_ENV !== "production") globalForS3.s3 = s3;

