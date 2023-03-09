import { Schema, model, models } from 'mongoose';

export const cartSchema = new Schema(
	{
		products: [
			{
				items: { type: Schema.Types.ObjectId, ref: 'Product' },
				qty: { type: Number, default: 1 },
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		totalQty: { type: Number, default: 0 },
		cartTotal: { type: Number, default: 0 },
		shippingCost: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

const Cart = models.Cart || model('Cart', cartSchema);
export default Cart;
