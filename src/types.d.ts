import { NextApiRequest } from 'next';

type IField = {
	title: string;
	name: string;
	type: string;
};
interface NextApiRequestExtended extends NextApiRequest {
	user: any;
	files: any;
	params: any;
}

interface JwtPayload {
	id: string;
	role: string;
	name: string;
	email: string;
	iat: number;
	exp: number;
}

type ImagesType = {
	_id: string;
	name: string;
};
type ProductType = {
	active: boolean;
	badge: string;
	category: {
		_id: string;
		title: string;
	};
	saleType: string;
	createdAt: date;
	description: string;
	regularPrice: number;
	salePrice: number;
	slug: string;
	status: string;
	stock: number;
	thumbnail: string;
	title: string;
	updatedAt: string;
	_id: string;
	stockUnit: string;
};
type CartProductType = {
	qty: number;
	active: boolean;
	badge: string;
	category: {
		_id: string;
		title: string;
	};
	saleType: string;
	createdAt: date;
	description: string;
	regularPrice: number;
	salePrice: number;
	slug: string;
	status: string;
	stock: number;
	thumbnail: string;
	title: string;
	updatedAt: string;
	_id: string;
	stockUnit: string;
};

type ProductCardType = {
	title: string;
	salePrice: number;
	regularPrice: number;
	_id: string;
	slug: string;
	badge: string;
	thumbnail: string;
	stock: number;
	category: {
		_id: string;
		title: string;
	};
};
type OrderType = {
	email: string;
	qty: number;
	status: string;
	_id: string;
	total: number;
};
