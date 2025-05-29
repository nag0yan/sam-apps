import {
	DynamoDBClient,
	PutItemCommand,
	ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { Create, List } from "./types/image";
const s3Client = new S3Client({
	region: "ap-northeast-1",
});
const dynamoDbClient = new DynamoDBClient({
	region: "ap-northeast-1",
});

export const create: Create = async (image) => {
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

export const list: List = async () => {
	const command = new ScanCommand({
		TableName: process.env.TABLE_NAME,
	});
	const response = await dynamoDbClient.send(command);
	console.info("Fetched image metadata from DynamoDB");
	return (
		response.Items?.map((item) => ({
			id: item.id.S!,
			filename: item.filename.S!,
		})) || []
	);
};
