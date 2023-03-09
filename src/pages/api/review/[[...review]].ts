import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
import {
	approveReview,
	createReview,
	getReviews,
} from 'src/backend/controller/reviewcontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();
router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/review/all', authorized, restictUser('admin'), getReviews)
	.post('/api/review/create', authorized, createReview)
	.put(
		'/api/review/approve/:id',
		authorized,
		restictUser('admin'),
		approveReview,
	);

export default router.handler({
	onError,
	onNoMatch,
});
