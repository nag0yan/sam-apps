import "dotenv/config";

function main() {
	const endpoint = process.env.API_ENDPOINT;
	const apiKey = process.env.API_KEY;
	if (endpoint == null) {
		console.error("API_ENDPOINT is not set in environment variables");
		return;
	}
	if (apiKey == null) {
		console.error("API_KEY is not set in environment variables");
		return;
	}
	const formData = new FormData();
	formData.append(
		"image",
		new Blob(["test image content"], { type: "image/png" }),
		"test.png",
	);

	fetch(`${endpoint}/images`, {
		method: "POST",
		body: formData,
		headers: {
			"Content-Type": "multipart/form-data",
			"x-api-key": apiKey,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Response", data);
		})
		.catch((error) => {
			console.error("Error", error);
		});
}
if (require.main === module) {
	main();
}
