import { NextApiResponse } from 'next';

import Order from '../models/ordermodel';
import Review from '../models/reviewmodel';
import Product from '../models/productmodel';
import CatchAsync from 'src/utils/catchAsync';
import { NextApiRequestExtended } from 'src/types';

export const createReview = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { review, rating, id } = req.body;
		const order = await Order.find({
			ordersItems: { $elemMatch: { id: req.body.id } },
			user: req.user._id,
		});
		if (order.length === 0) throw new Error(`You don't have a permission`);
		const newReview = await Review.create({
			user: req.user._id,
			product: id,
			review,
			rating,
		});
		const product = await Product.findOneAndUpdate(
			{ _id: id },
			{
				$push: { review: newReview._id },
			},
		);
		if (!product) throw new Error('Oops, Please try again');
		res.status(200).json({
			status: 'success',
			message: 'Review submitted for approval',
		});
	},
);
export const getReviews = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const reviews = await Review.find({})
			.select('-__v -updatedAt -thumbnail')
			.populate({
				path: 'product user',
				select: 'title thumbnail email userName',
			})
			.skip(skip)
			.limit(parseInt(limit as string, 10));
		const totalPost = await Review.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: reviews,
		});
	},
);
export const approveReview = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		const reviews = await Review.findByIdAndUpdate(id, {
			active: true,
		});
		if (!reviews) throw new Error('Please try again');
		res.status(200).json({
			status: 'success',
			message: 'Review approved',
		});
	},
);
