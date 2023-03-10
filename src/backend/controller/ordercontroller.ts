import CatchAsync from '../../utils/catchAsync';
import { NextApiRequestExtended } from '../../types';
import { NextApiResponse } from 'next';
import Order from '../models/ordermodel';
import Product from '../models/productmodel';
import Payment from '../models/paymentmodel';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const stripePayment = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { amount, id, orderInfo } = req.body;
		// 1. Create Order First
		for (const key of orderInfo.ordersItems) {
			const data = await Product.findById(key.id).select('stock');
			if (data.stock < key.qty) {
				throw new Error('Product not have sufficient quantity');
			}
		}
		const order = await Order.create({
			ordersItems: [...orderInfo.ordersItems],
			qty: orderInfo.qty,
			user: req.user._id,
			total: orderInfo.total,
			shipping: {
				province: orderInfo.province,
				city: orderInfo.city,
				area: orderInfo.area,
				address: orderInfo.address,
			},
			shippingCost: orderInfo.shippingCost,
			note: orderInfo.note,
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
		});
		if (!order) throw new Error('Please try again');
		const updateProduct = orderInfo.ordersItems.map(async function (item: {
			id: string;
			qty: number;
			price: number;
		}) {
			return await Product.findByIdAndUpdate(item.id, {
				$inc: { sold: item.qty, stock: -item.qty },
			});
		});
		//2. Add Order Info Into Payment
		const newPayment = await Payment.create({
			orderId: order._id,
			user: req.user._id,
			paymentMethod: 'card',
			status: 'pending',
		});
		if (!newPayment)
			throw new Error('Something went wrong creating payment');
		//3. Create Payment Now
		const price = amount * 100;
		const paymentDetails = await stripe.paymentIntents.create({
			amount: price,
			currency: 'USD',
			description: 'Purchase Product',
			payment_method: id,
			confirm: true,
		});
		if (!paymentDetails)
			throw new Error('Payment Failed. Please try again.');
		if (paymentDetails.status !== 'succeeded')
			throw new Error('Payment Failed. Please try again.');
		// 4. Update the payment status
		const updatePayment = await Payment.findByIdAndUpdate(newPayment._id, {
			paymentId: paymentDetails.payment_method,
			status: 'success',
		});
		res.status(200).json({
			status: 'success',
			payemntID: paymentDetails.payment_method,
			id: order._id,
		});
	},
);
export const userOrders = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const orders = await Order.find({
			email: req.user.email,
		})
			.select('_id status qty total email')
			.sort('-createdAt');
		res.status(200).json({
			status: 'success',
			data: orders,
		});
	},
);
export const orderDetails = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		const order = await Order.findById(id)
			.populate({
				path: 'ordersItems.id',
				select: 'title thumbnail salePrice',
			})
			.select('-updatedAt -__v -user')
			.exec();

		if (!order) throw new Error('Order number is invalid');
		res.status(200).json({
			status: 'success',
			data: order,
		});
	},
);
export const updateOrderStatus = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		const { status } = req.body;
		const order = await Order.findByIdAndUpdate(id, {
			status,
		});
		if (!order) throw new Error('Invalid order number!');
		res.status(200).json({
			status: 'success',
			message: 'Order status updated',
		});
	},
);
export const orderList = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const orders = await Order.find({})
			.select('_id status qty total email createdAt')
			.sort('-createdAt')
			.skip(skip)
			.limit(parseInt(limit as string, 10));
		const totalPost = await Order.countDocuments({});
		res.status(200).json({
			status: 'success',
			orders,
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
		});
	},
);
