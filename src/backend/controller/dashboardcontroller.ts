import { NextApiResponse } from 'next';
import Payment from '../models/paymentmodel';
import User from '../models/usermodel';
import Order from '../models/ordermodel';
import Product from '../models/productmodel';
import Review from '../models/reviewmodel';
import CatchAsync from 'src/utils/catchAsync';
import { NextApiRequestExtended } from 'src/types';

export const getAdminDashboard = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const totalPost = await Payment.countDocuments({});
		const totalUser = await User.countDocuments({});
		const totalOrder = await Order.countDocuments({});
		const totalProduct = await Product.countDocuments({});
		const totalReview = await Review.countDocuments({});

		const PaymentList = await Payment.find()
			.populate({
				path: 'user',
				select: '_id thumbnail userName firstName lastName',
			})
			.populate({
				path: 'orderId',
				select: '_id total',
			})
			.select('-__v -updatedAt')
			.skip(skip)
			.limit(parseInt(limit as string, 10))
			.exec();
		if (!PaymentList) throw new Error('Something is wrong with populate');
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: PaymentList,
			user: totalUser,
			order: totalOrder,
			product: totalProduct,
			review: totalReview,
		});
	},
);
export const getUserDashboard = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const totalOrder = await Order.find({ email: req.user.email }).select(
			'_id ordersItems total',
		);
		const totalReview = await Review.find({ email: req.user.email }).select(
			'_id',
		);
		const totalSpend = totalOrder.reduce(
			(prev, curent) => prev + curent.total,
			0,
		);
		const totalProduct = totalOrder.reduce(
			(prev, curent) => prev + curent.ordersItems.length,
			0,
		);

		res.status(200).json({
			status: 'success',
			order: totalOrder.length,
			review: totalReview.length,
			totalSpend,
			totalProduct,
		});
	},
);
