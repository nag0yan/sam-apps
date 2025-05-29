import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { CreateRequest } from "./types/image";
const s3Client = new S3Client({
	region: "ap-northeast-1",
});
const dynamoDbClient = new DynamoDBClient({
	region: "ap-northeast-1",
});

export const create: CreateRequest = async (image) => {
	const decordedData = Buffer.from(image.data, "base64");
	const id = crypto.randomUUID();
	await s3Client.send(
		new PutObjectCommand({
			Bucket: process.env.BUCKET_NAME,
			Key: id,
			Body: decordedData,
			ContentLength: decordedData.byteLength,
		}),
	);
	console.info("Image uploaded to S3 with ID:", id);
	await dynamoDbClient.send(
		new PutItemCommand({
			TableName: process.env.TABLE_NAME,
			Item: {
				id: { S: id },
				filename: { S: image.filename },
			},
		}),
	);
	console.info("Image metadata saved to DynamoDB with ID:", id);
};
