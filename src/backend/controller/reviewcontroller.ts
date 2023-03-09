import { NextApiResponse } from 'next';

import Order from '../models/ordermodel';
import Review from '../models/reviewmodel';
import Product from '../models/productmodel';
import CatchAsync from 'src/utils/catchAsync';
import { NextApiRequestExtended } from 'src/types';

export const createReview = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { name, review, rating, productId } = req.body;
		const order = await Order.find({
			ordersItems: { $elemMatch: { product: req.body.productId } },
		});
		if (order.length === 0)
			throw new Error(`Product is not exist in your order list`);
		const newReview = await Review.create({
			name,
			user: req.user._id,
			thumbnail: req.user.thumbnail,
			product: productId,
			review,
			rating,
		});
		const product = await Product.findById(productId);
		product.review.push(newReview._id);
		await product.save();
		if (!newReview) throw new Error('Oops, Please try again');
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
			.select('-__v -user -updatedAt -thumbnail')
			.populate({
				path: 'product',
				select: 'title thumbnail',
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
