import {
	DynamoDBClient,
	GetItemCommand,
	PutItemCommand,
	ResourceNotFoundException,
	ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
	type Create,
	type Get,
	type Image,
	type List,
	NotFoundError,
} from "./types/image";
const s3Client = new S3Client({
	region: "ap-northeast-1",
});
const dynamoDbClient = new DynamoDBClient({
	region: "ap-northeast-1",
});

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

export const get: Get = async (id: string) => {
	try {
		const imageUrl = await getSignedUrl(
			s3Client,
			new GetObjectCommand({
				Bucket: process.env.BUCKET_NAME,
				Key: id,
			}),
			{ expiresIn: 3600 },
		);
		const getMetadataResponse = await dynamoDbClient.send(
			new GetItemCommand({
				TableName: process.env.TABLE_NAME,
				Key: {
					id: { S: id },
				},
			}),
		);
		const image: Image = {
			id: getMetadataResponse.Item!.id.S!,
			filename: getMetadataResponse.Item!.filename.S!,
			url: imageUrl,
		};
		return image;
	} catch (e) {
		if (e instanceof ResourceNotFoundException) {
			throw new NotFoundError(`Image with ID ${id}'s metadata not found`);
		}
		throw e;
	}
};

export const uploadUrl = async (id: string) => {
	const command = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME,
		Key: id,
	});
	const url = await getSignedUrl(s3Client, command, {
		expiresIn: 3600,
	});
	return url;
};

export const create: Create = async (image) => {
	const id = crypto.randomUUID();
	const url = await uploadUrl(id);
	await dynamoDbClient.send(
		new PutItemCommand({
			TableName: process.env.TABLE_NAME,
			Item: {
				id: { S: id },
				filename: { S: image.filename || id },
			},
		}),
	);
	console.info("Image metadata saved to DynamoDB with ID:", id);
	return {
		id,
		uploadUrl: url,
	};
};
