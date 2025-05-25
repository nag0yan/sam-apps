import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Create } from "./types/image";
const client = new S3Client({
	region: "ap-northeast-1",
});

export const create: Create = async (image) => {
	const bucketName = process.env.BUCKET_NAME;
	await client.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: crypto.randomUUID(),
		}),
	);
};
