import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as Image from "./image-aws";
import { NotFoundError } from "./types/image";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	const id = event.pathParameters?.id;
	if (id == null) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Bad Request: Missing image ID",
			}),
		};
	}
	try {
		const image = await Image.get(id);
		const response: APIGatewayProxyResult = {
			statusCode: 200,
			body: JSON.stringify({
				image: image,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};
		return response;
	} catch (e) {
		if (e instanceof NotFoundError) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: "Image not found",
				}),
			};
		}
		console.error("Error fetching image:", e);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error",
			}),
		};
	}
};
