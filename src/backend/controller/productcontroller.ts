import type { NextApiResponse } from 'next';
import Product from '../models/productmodel';
import slugify from 'slugify';
import Category from '../models/categorymodel';
import Review from '../models/reviewmodel';
import CatchAsync from 'src/utils/catchAsync';
import { NextApiRequestExtended } from 'src/types';

export const getProducts = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { select, limit = 9, page = 1 } = req.query;
		const selectedData = (select ? (select as string) : '-__v,-updatedAt')
			.split(',')
			.join(' ');
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

		const products = await Product.find({})
			.select(select ? selectedData : '-__v')
			.populate({
				path: 'category',
				select: 'title',
			})
			.sort('-createdAt')
			.skip(skip)
			.limit(parseInt(limit as string, 10));

		const totalPost = await Product.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			totalProducts: totalPost,
			data: products,
		});
	},
);
export const createProduct = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const {
			name,
			thumbnail,
			gallery,
			salePrice,
			regularPrice,
			sku,
			stock,
			category,
			description,
			badge,
			saleType,
		} = req.body;
		const slug = slugify(name, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		const newProduct = await Product.create({
			title: name,
			slug,
			thumbnail,
			regularPrice,
			salePrice,
			stockUnit: sku,
			stock,
			badge,
			category,
			saleType,
			description,
		});

		if (!newProduct) throw new Error('Please try again');

		newProduct.gallery = gallery;
		await newProduct.save();
		const getCategory = await Category.findById(category);
		getCategory.products.push(newProduct._id);
		await getCategory.save();
		res.status(200).json({
			status: 'success',
			message: 'Product created successfully',
		});
	},
);
export const deleteProduct = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (product.category) {
			await Category.findOneAndUpdate(product.category, {
				$pull: {
					products: product._id,
				},
			});
			await Product.findByIdAndDelete(id);
			res.status(200).json({
				status: 'success',
				message: 'Successfully deleted',
			});
		} else {
			await Product.findByIdAndDelete(id);
			res.status(200).json({
				status: 'success',
				message: 'Successfully deleted',
			});
		}
	},
);
export const getHomeProduct = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const newArrival = await Product.find({
			saleType: { $ne: 'flash-deal' },
		})
			.populate({
				path: 'category',
				select: 'title',
			})
			.select(
				'title salePrice regularPrice badge _id slug thumbnail stock sold',
			)
			.limit(9)
			.sort({ createdAt: -1 });
		const flashDealCountDown = await Product.findOne({
			saleType: 'flash-deal',
		})
			.populate({
				path: 'category',
				select: 'title',
			})
			.select(
				'title salePrice regularPrice badge _id slug thumbnail stock sold',
			)
			.limit(1)
			.sort({ createdAt: -1 });
		const flashDeal = await Product.find({ saleType: 'flash-deal' })
			.populate({
				path: 'category',
				select: 'title',
			})
			.select(
				'title salePrice regularPrice badge _id slug thumbnail stock sold',
			)
			.limit(4)
			.skip(1)
			.sort({ createdAt: -1 });

		res.status(200).json({
			status: 'success',
			newArrival,
			flashDealItems: {
				flashDealCountDown,
				flashDeal,
			},
		});
	},
);
export const getSingleProduct = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { id } = req.params;
		const product = await Product.findById(id)
			.populate({
				path: 'category',
				select: '_id title',
			})
			.select('-createdAt -updatedAt -__v -sold -status');
		if (!product) throw new Error('Invalid Product ID');
		res.status(200).json({
			status: 'success',
			data: product,
		});
	},
);
export const updateProduct = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const {
			name,
			thumbnail,
			gallery,
			salePrice,
			regularPrice,
			sku,
			stock,
			category,
			description,
			badge,
			saleType,
		} = req.body;
		const { id } = req.params;
		const exist = await Product.findById(id);
		if (!exist) throw new Error('Product not found!');
		await Category.findOneAndUpdate(exist.category, {
			$pull: {
				products: exist._id,
			},
		});
		const slug = slugify(name, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		const updateProduct = await Product.findByIdAndUpdate(
			id,
			{
				title: name,
				slug,
				thumbnail,
				regularPrice,
				salePrice,
				stockUnit: sku,
				stock,
				badge,
				category,
				saleType,
				description,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!updateProduct) throw new Error('Please try again');

		updateProduct.gallery = gallery;
		await updateProduct.save();
		const getCategory = await Category.findById(category);
		getCategory.products.push(updateProduct._id);
		await getCategory.save();
		res.status(200).json({
			status: 'success',
			message: 'Product updated successfully',
		});
	},
);
export const getSingleProductBySlug = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { slug } = req.params;
		const product = await Product.findOne({
			slug,
		})
			.populate({
				path: 'category',
				select: '_id title',
			})
			.select('-createdAt -updatedAt -__v -sold -status')
			.exec();
		if (!product) throw new Error('Invalid Product ID');

		const reviews = await Review.find({ product: product._id })
			.select('-user -updatedAt -product -createdAt -active -__v')
			.sort({ createdAt: -1 });

		const sum = reviews.reduce((acc, rating) => acc + rating.rating, 0);
		const avg = sum / reviews.length;
		const similarProduct = await Product.find({
			category: product.category,
			slug: { $ne: slug },
		})
			.limit(4)
			.populate({
				path: 'category',
				select: '_id title',
			})
			.select(
				'title slug thumbnail salePrice regularPrice stock category badge',
			);
		const moreItem = await Product.find({
			category: { $ne: product.category },
		})
			.populate({
				path: 'category',
				select: '_id title',
			})
			.limit(4 - similarProduct.length)
			.select(
				'title slug thumbnail salePrice regularPrice stock category badge',
			);

		res.status(200).json({
			status: 'success',
			data: product,
			reviews: reviews,
			similarProduct: [...similarProduct, ...moreItem],
			totalRatings: reviews.length,
			reviewStat: reviews.length > 0 ? Math.round(avg) : 0,
		});
	},
);
