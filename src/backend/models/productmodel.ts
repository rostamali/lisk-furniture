import { Schema, model, models } from 'mongoose';

export const productSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Product must have title'],
			unique: true,
			trim: true,
		},
		slug: {
			type: String,
		},
		thumbnail: {
			type: String,
			required: [true, 'Product must have thumbnail'],
		},
		gallery: [
			{
				type: String,
			},
		],
		regularPrice: {
			type: Number,
		},
		salePrice: {
			type: Number,
			required: [true, 'Product price required'],
		},
		stockUnit: {
			type: String,
			required: [true, 'Product SKU required'],
		},
		stock: {
			type: Number,
			default: 0,
		},
		sold: { type: Number, default: 0 },
		badge: {
			type: String,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'Post must have category'],
		},
		saleType: {
			type: String,
		},
		description: {
			type: String,
		},
		active: {
			type: Boolean,
			default: true,
		},
		review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
	},
	{ timestamps: true },
);
const Product = models.Product || model('Product', productSchema);
export default Product;
