import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';

import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import {
	orderDetails,
	orderList,
	stripePayment,
	updateOrderStatus,
	userOrders,
} from 'src/backend/controller/ordercontroller';
import { authorized, restictUser } from 'src/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/order/single', authorized, userOrders)
	.get('/api/order/list', authorized, restictUser('admin'), orderList)
	.post(
		'/api/order/stripepayment',
		authorized,
		restictUser('user', 'admin'),
		stripePayment,
	)
	.put(
		'/api/order/status/:id',
		authorized,
		restictUser('admin'),
		updateOrderStatus,
	)
	.get(
		'/api/order/:id',
		authorized,
		restictUser('user', 'admin'),
		orderDetails,
	);

export default router.handler({
	onError,
	onNoMatch,
});
