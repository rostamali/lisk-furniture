import { Schema, model, models } from 'mongoose';

export const orderSchema = new Schema(
	{
		ordersItems: [
			{
				id: { type: Schema.Types.ObjectId, ref: 'Product' },
				qty: { type: Number },
				price: { type: Number },
			},
		],
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		status: {
			type: String,
			enum: ['processing', 'packed', 'shipped', 'delivered'],
			default: 'processing',
		},
		qty: { type: Number },
		total: { type: Number },
		shipping: {
			province: { type: String },
			city: { type: String },
			area: { type: String },
			address: { type: String },
		},
		shippingCost: { type: Number },
		note: { type: String },
		email: { type: String },
		firstName: { type: String },
		lastName: { type: String },
		payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
	},
	{ timestamps: true },
);

const Order = models.Order || model('Order', orderSchema);
export default Order;
