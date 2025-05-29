export type CreateRequest = {
	filename: string;
	data: string;
};
export type Image = {
	id: string;
	filename: string;
	data: string;
};
export type ImageMetadata = Omit<Image, "data">;
export type Create = (image: CreateRequest) => Promise<void>;
export type List = () => Promise<ImageMetadata[]>;
export type Get = (id: string) => Promise<Image>;
export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundError";
	}
}
