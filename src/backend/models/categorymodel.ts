import { Schema, model, models } from 'mongoose';

export const categorySchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Product category must have title'],
			unique: true,
			trim: true,
		},
		slug: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
		parent: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
		description: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Category = models.Category || model('Category', categorySchema);
export default Category;
