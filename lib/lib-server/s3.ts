import { S3Client } from "@aws-sdk/client-s3";

const globalForS3 = globalThis as unknown as { s3?: S3Client };

export const s3: S3Client = globalForS3.s3 ?? new S3Client({
    endpoint: "http://localhost:9000",
    region: "us-east-1", // MinIO は region の指定が不要だが、エラー回避のため設定
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER as string,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD as string,
    },
    forcePathStyle: true, // Path-style アクセスを強制
});

// 開発環境では globalThis に保存して再生成を防ぐ
if (process.env.NODE_ENV !== "production") globalForS3.s3 = s3;

