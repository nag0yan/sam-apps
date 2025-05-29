export type CreateRequest = {
	filename: string;
	data: string;
};
export type Create = (image: CreateRequest) => Promise<void>;
