import type {
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
	Context,
} from "aws-lambda";

export const lambdaHandler = async (
	event: APIGatewayProxyEvent,
	context: Context,
) => {
	const response: APIGatewayProxyResult = {
		statusCode: 201,
		body: JSON.stringify({
			message: "Image uploaded successfully",
		}),
	};

	return response;
};
