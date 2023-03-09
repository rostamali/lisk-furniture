import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import {
	createCategory,
	deleteCategory,
	getCategorys,
	updateCategory,
} from 'src/backend/controller/categorycontroller';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/category/all', getCategorys)
	.post(
		'/api/category/create',
		authorized,
		restictUser('admin'),
		createCategory,
	)
	.put(
		'/api/category/update/:id',
		authorized,
		restictUser('admin'),
		updateCategory,
	)
	.delete(
		'/api/category/delete/:id',
		authorized,
		restictUser('admin'),
		deleteCategory,
	);

export default router.handler({
	onError,
	onNoMatch,
});
