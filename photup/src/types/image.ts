export type Create = (image: {
	data: Buffer<ArrayBuffer>;
}) => Promise<void>;
