import type { APIGatewayProxyEvent } from "aws-lambda";
import * as Image from "./image-aws";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	const body = event.body;
	let filename: string | undefined;
	if (body != null) {
		try {
			const parsedBody = JSON.parse(body);
			filename = parsedBody.filename;
		} catch (e) {
			console.error("Invalid json", e);
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Invalid JSON",
				}),
			};
		}
	}
	try {
		const image = await Image.create({
			filename,
		});
		console.info("Generated upload URL for image with ID:", image.id);
		return {
			statusCode: 200,
			body: JSON.stringify({
				id: image.id,
				uploadUrl: image.uploadUrl,
			}),
		};
	} catch (e) {
		console.error("Error on creating image:", e);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error",
			}),
		};
	}
};
