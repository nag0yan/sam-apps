import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { CreateRequest } from "./types/image";
const client = new S3Client({
	region: "ap-northeast-1",
});

export const create: CreateRequest = async (image) => {
	const bucketName = process.env.BUCKET_NAME;
	const decordedData = Buffer.from(image.data, "base64");
	await client.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: crypto.randomUUID(),
			Body: decordedData,
			ContentLength: decordedData.byteLength,
		}),
	);
};
