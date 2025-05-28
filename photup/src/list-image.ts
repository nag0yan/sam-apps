import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const lambdaHandler = async (event: APIGatewayProxyEvent) => {
	const response: APIGatewayProxyResult = {
		statusCode: 200,
		body: JSON.stringify({
			message: "List of images",
		}),
	};
	return response;
};
