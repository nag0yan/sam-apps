import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as image from "./image-s3";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	console.log("Content-Type:", event.headers["content-type"]);
	console.log("IsBase64Encoded:", event.isBase64Encoded);
	const body = event.body;
	if (body == null) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "No image data provided",
			}),
		};
	}
	console.log("Body Size", body.length);
	try {
		await image.create({
			data: Buffer.from(body, "base64"),
		});

		const response: APIGatewayProxyResult = {
			statusCode: 201,
			body: JSON.stringify({
				message: "Image uploaded successfully",
			}),
		};
		return response;
	} catch (e) {
		console.error("Error uploading image:", e);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error",
			}),
		};
	}
};
