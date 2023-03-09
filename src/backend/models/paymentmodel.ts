import { Schema, model, models } from 'mongoose';

export const paymentSchema = new Schema(
	{
		orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		paymentMethod: {
			type: String,
			required: [true, 'Payment method required'],
		},
		paymentId: {
			type: String,
		},
		status: {
			type: String,
			default: 'pending',
			required: [true, 'Payment status is required'],
		},
	},
	{ timestamps: true },
);

const Payment = models.Payment || model('Payment', paymentSchema);
export default Payment;
