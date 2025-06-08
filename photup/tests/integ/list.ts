import "dotenv/config";

async function main() {
	const endpoint = process.env.ENDPOINT;
	const apiKey = process.env.API_KEY;
	if (endpoint == null) {
		console.error("API_ENDPOINT is not set in environment variables");
		return;
	}
	if (apiKey == null) {
		console.error("API_KEY is not set in environment variables");
		return;
	}
	const listImagesResponse = await fetch(`${endpoint}/images`, {
		method: "GET",
		headers: {
			"x-api-key": apiKey,
		},
	});
	if (!listImagesResponse.ok) {
		console.error("Failed to list images");
		return;
	}
	const images = await listImagesResponse.json();
	console.log(images);
}
if (require.main === module) {
	main();
}
