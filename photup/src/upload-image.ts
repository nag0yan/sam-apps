import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as image from "./image-aws";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	console.info("isBase64Encoded:", event.isBase64Encoded);
	if (event.body == null) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "No image data provided",
			}),
		};
	}
	const createRequest = JSON.parse(event.body);
	if (createRequest.filename == null || createRequest.data == null) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Filename and data are required",
			}),
		};
	}

	const body = Buffer.from(event.body, "base64");
	try {
		await image.create(createRequest);

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
