import "dotenv/config";

type CreateImageResponse = {
	id: string;
	uploadUrl: string;
};

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

	const createImageResponse = await fetch(`${endpoint}/images`, {
		method: "POST",
		body: JSON.stringify({ filename: "test.png" }),
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
		},
	});
	if (!createImageResponse.ok) {
		console.error("Failed to create image");
		return;
	}
	const createImageData: CreateImageResponse =
		(await createImageResponse.json()) as CreateImageResponse;
	const uploadUrl = createImageData.uploadUrl;

	await fetch(uploadUrl, {
		method: "PUT",
		body: new Blob(["test image content"], { type: "image/png" }),
		headers: {
			"Content-Type": "image/png",
		},
	}).catch((error) => {
		console.error("Error", error);
		throw new Error("Failed to upload image");
	});

	console.log("Image created with ID:", createImageData.id);

	const getImageResponse = await fetch(
		`${endpoint}/images/${createImageData.id}`,
		{
			method: "GET",
			headers: {
				"x-api-key": apiKey,
			},
		},
	);
	if (!getImageResponse.ok) {
		console.error("Failed to get image");
		return;
	}
	const imageData = await getImageResponse.json();
	console.log("Image data:", imageData);
}
if (require.main === module) {
	main();
}
