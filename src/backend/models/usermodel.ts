import { Schema, model, models } from 'mongoose';

export const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: [true, 'Must need user name'],
			trim: true,
			minLength: 2,
			maxLength: 30,
			unique: true,
		},
		firstName: {
			type: String,
			trim: true,
			minLength: 2,
			maxLength: 30,
		},
		lastName: {
			type: String,
			trim: true,
			minLength: 2,
			maxLength: 30,
		},
		email: {
			type: String,
			required: [true, 'Must need user email'],
			unique: true,
			lowercase: true,
		},
		thumbnail: { type: String, default: 'user.png' },
		password: {
			type: String,
			minLength: 6,
			maxLength: 120,
			required: [true, 'Must need user password'],
		},
		role: {
			type: String,
			required: true,
			default: 'user',
			enum: {
				values: ['admin', 'user', 'editor'],
				message: 'User role is required',
			},
		},
		passwordChangeAt: {
			type: Date,
		},
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		cart: {
			type: Schema.Types.ObjectId,
			ref: 'Cart',
		},
	},
	{ timestamps: true },
);

const User = models.User || model('User', userSchema);
export default User;
