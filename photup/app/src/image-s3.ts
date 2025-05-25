import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Create } from "./types/image";
const bucketName = "photup-images-0123456789";
const client = new S3Client({
	region: "ap-northeast-1",
});

export const create: Create = async (image) => {
	await client.send(
		new PutObjectCommand({
			Bucket: bucketName,
			Key: crypto.randomUUID(),
		}),
	);
};
