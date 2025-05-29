export type CreateRequest = {
	filename: string;
	data: string;
};
export type Image = {
	id: string;
	filename: string;
};
export type Create = (image: CreateRequest) => Promise<void>;
export type List = () => Promise<Image[]>;
