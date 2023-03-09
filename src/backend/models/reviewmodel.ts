import { Schema, model, models } from 'mongoose';

export const reviewSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'User must have name'],
			trim: true,
		},
		thumbnail: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: [true, 'Review must have product ID'],
		},
		review: {
			type: String,
			required: [true, 'Review description required'],
		},
		rating: { type: Number, required: [true, 'Star rating is required'] },
		active: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);
const Review = models.Review || model('Review', reviewSchema);
export default Review;
