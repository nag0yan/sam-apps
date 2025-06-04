import type { APIGatewayProxyResult } from "aws-lambda";
import * as Image from "./image-aws";

export const lambdaHandler = async () => {
	try {
		const imageList = await Image.list();
		const response: APIGatewayProxyResult = {
			statusCode: 200,
			body: JSON.stringify({
				images: imageList,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};
		return response;
	} catch (e) {
		console.error("Error fetching image list:", e);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal Server Error",
			}),
		};
	}
};
