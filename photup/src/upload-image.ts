import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as image from "./image-s3";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	const body = event.body;
	if (body == null) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "No image data provided",
			}),
		};
	}
	try {
		await image.create({
			data: body,
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
