import type { NextApiResponse } from 'next';
import slugify from 'slugify';
import Category from '../models/categorymodel';
import Product from '../models/productmodel';
import mongoose from 'mongoose';
import CatchAsync from 'src/utils/catchAsync';
import { NextApiRequestExtended } from 'src/types';

export const getCategorys = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { select, limit = 9, page = 1 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
		const selectedData = (select as string).split(',').join(' ');
		const categorys = await Category.find({})
			.select(selectedData ? selectedData : '-__v')
			.populate({
				path: 'parent',
				model: 'Category',
				select: '_id title thumbnail',
			})
			.skip(skip)
			.limit(parseInt(limit as string, 10));

		const totalPost = await Category.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string),
			data: categorys,
		});
	},
);
export const createCategory = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { title, parent, thumbnail, description } = req.body;
		if (!title) throw new Error('Category name missing');
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});

		if (!mongoose.Types.ObjectId.isValid(parent)) {
			const data = await Category.create({
				title,
				thumbnail,
				slug,
				description,
			});
			if (!data) throw new Error('Invalid data');
			res.status(200).json({
				status: 'success',
				message: 'Category created successfully',
			});
		} else {
			const data = await Category.create({
				title,
				thumbnail,
				slug,
				parent,
				description,
			});
			if (!data) throw new Error('Invalid data');
			res.status(200).json({
				status: 'success',
				message: 'SubCategory created successfully',
			});
		}
	},
);
export const deleteCategory = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const category = await Category.findById(id).select(
			'-__v -updatedAt -createdAt',
		);
		if (category.title === 'uncategorized') {
			throw new Error('This is not deletable!');
		}
		if (category.products.length === 0) {
			await Category.findByIdAndDelete(id);
			res.status(200).json({
				status: 'success',
				message: 'Deleted Successfully',
			});
		}

		const defaultCategory = await Category.findOne({
			title: 'uncategorized',
		});
		if (!defaultCategory) {
			const createUncategorized = await Category.create({
				title: 'uncategorized',
				slug: 'uncategorized',
			});
			await Product.updateMany(
				{ _id: category.products },
				{
					category: createUncategorized._id,
					products: category.products,
				},
				{
					new: true,
					runValidators: true,
				},
			);
			createUncategorized.products = category.products;
			await createUncategorized.save();
			const deleteCat = await Category.findByIdAndDelete(id);
			if (!deleteCat) {
				throw new Error('Please try again');
			}
			res.status(200).json({
				status: 'success',
				message: 'Successfully deleted',
			});
		} else {
			await Product.updateMany(
				{ _id: category.products },
				{
					category: defaultCategory._id,
					posts: category.products,
				},
				{
					new: true,
					runValidators: true,
				},
			);
			defaultCategory.products.push(category.posts);
			await defaultCategory.save();
			const deleteCat = await Category.findByIdAndDelete(id);
			if (!deleteCat) {
				throw new Error('Please try again');
			}
			res.status(200).json({
				status: 'success',
				message: 'Successfully deleted',
			});
		}
	},
);
export const updateCategory = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const { id } = req.params;
		const { title, parent, description } = req.body;
		if (!title) throw new Error('Invalid category title');
		const slug = slugify(title, {
			replacement: '-',
			lower: true,
			trim: true,
		});

		const notupdateable = await Category.findById(id);
		if (notupdateable.title === 'uncategorized')
			throw new Error('Uncategorized is not updateable !');
		if (!mongoose.Types.ObjectId.isValid(parent)) {
			const category = await Category.findByIdAndUpdate(id, {
				title,
				description,
				thumbnail: req.body.thumbnail,
				slug,
				parent: null,
			});
			if (!category) throw new Error('Oops, try again');
			res.status(200).json({
				status: 'success',
				message: 'Category updated successfully',
			});
		} else {
			const category = await Category.findByIdAndUpdate(id, {
				title,
				description,
				parent,
				thumbnail: req.body.thumbnail,
				slug,
			});
			if (!category) throw new Error('Oops, try again');
			res.status(200).json({
				status: 'success',
				message: 'Subcategory updated successfully',
			});
		}
	},
);
