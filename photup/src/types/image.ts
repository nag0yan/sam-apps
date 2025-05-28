export type CreateRequest = (image: {
	filename: string;
	data: string;
}) => Promise<void>;
