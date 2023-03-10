import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import {
	createProduct,
	deleteProduct,
	getHomeProduct,
	getProducts,
	getSingleProduct,
	getSingleProductBySlug,
	shopProducts,
	updateProduct,
} from 'src/backend/controller/productcontroller';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();
router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/product/all', getProducts)
	.get('/api/product/shop', shopProducts)
	.get('/api/product/single/:id', getSingleProduct)
	.get('/api/product/single/details/:slug', getSingleProductBySlug)
	.get('/api/product/homeproduct', getHomeProduct)
	.post(
		'/api/product/create',
		authorized,
		restictUser('admin'),
		createProduct,
	)
	.put(
		'/api/product/update/:id',
		authorized,
		restictUser('admin'),
		updateProduct,
	)
	.delete(
		'/api/product/delete/:id',
		authorized,
		restictUser('admin'),
		deleteProduct,
	);

export default router.handler({
	onError,
	onNoMatch,
});
