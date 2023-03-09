import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CardElement } from '@stripe/react-stripe-js';
import ButtonLoader from '../common/shared/ButtonLoader';

const Payment = ({ loading }: { loading: boolean }) => {
	const { cartSubTotal, total } = useSelector(
		(state: RootState) => state.cart,
	);
	const { cost } = useSelector((state: RootState) => state.shippingForm);

	const CartInfo = [
		{
			label: 'Subtotal',
			cost: cartSubTotal.toFixed(2),
			class: '',
		},
		{
			label: 'Shipping',
			cost: cost.toFixed(2),
			class: '',
		},
		{
			label: 'Total',
			cost: total.toFixed(2),
			class: 'font-semibold text-xl',
		},
	];

	return (
		<>
			<div className="cart-totals__wrapper bg-gray-light font-mulish px-6 pt-8 pb-4 rounded-md">
				<div className="cart-totals__wrapper bg-gray-light font-mulish px-5 pt-8 pb-4 rounded-md">
					{CartInfo.map((item, index) => (
						<div
							className="subtotal flex items-center justify-between py-3 border-b border-b-[#eee]"
							key={index}
						>
							<p className="subtotal-label text-black text-base font-medium">
								{item.label}
							</p>
							<p className="subtotal-value text-gray-thin text-base font-medium">
								${item.cost}
							</p>
						</div>
					))}
				</div>
				<div className="px-5 py-5">
					<div className="">
						<CardElement
							options={{
								iconStyle: 'solid',
								style: {
									base: {
										iconColor: '#FAAD3D',
										color: '#000',
										fontWeight: 500,
										fontSize: '16px',
										fontSmoothing: 'antialiased',
										':-webkit-autofill': {
											color: '#FAAD3D',
										},
										'::placeholder': { color: '#333' },
									},
									invalid: {
										iconColor: '#e74c3c',
										color: '#e74c3c',
									},
								},
							}}
						/>
					</div>
				</div>
				<button
					className="w-full block text-center rounded-md bg-orange-dark text-white py-3 uppercase text-base font-medium mt-4 h-[45px]"
					form="shippingForm"
					disabled={loading}
				>
					{loading ? <ButtonLoader /> : 'Purchase Now'}
				</button>
			</div>
		</>
	);
};

export default Payment;
