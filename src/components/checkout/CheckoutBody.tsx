import { useSelector } from 'react-redux';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { useForm, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import ShippingForm from './ShippingForm';
import Payment from './Payment';
import store, { RootState } from 'src/redux/store';
import dynamic from 'next/dynamic';
import { useCreateData, useFetchData } from 'src/hooks/useApi';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkoutFormValidator } from '../../utils/validators';
import { deleteCart } from 'src/redux/slices/cartSlice';
import { deleteShipping } from 'src/redux/slices/shippingFormSlice';

const OrderItems = dynamic(() => import('./OrderItems'), {
	ssr: false,
});

const CheckoutBody = () => {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();
	const { province, selectedArea, selectedCity } = useSelector(
		(state: RootState) => state.shippingForm,
	);
	const { cartItem, total, shipCost } = useSelector(
		(state: RootState) => state.cart,
	);
	let orderObject: any = [];

	const orderItem = cartItem.reduce(
		(previous, current) =>
			orderObject.push({
				id: current._id,
				qty: current.qty,
				price: current.qty * current.salePrice,
			}),
		orderObject,
	);
	const { data: user, isLoading: loadUser } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	const { mutate: createOrder, isLoading } = useCreateData(
		'/api/order/stripepayment',
		'order',
	);

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(checkoutFormValidator),
	});
	const onSubmit = async (data: FieldValues) => {
		const card = elements?.getElement(CardElement);
		if (!stripe || !elements || !card) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});
		if (!error) {
			try {
				const { id } = paymentMethod;
				createOrder(
					{
						amount: total,
						id,
						orderInfo: {
							qty: orderItem,
							total,
							shippingCost: shipCost,
							ordersItems: orderObject,
							province,
							city: selectedCity,
							area: selectedArea,
							address: data.address,
							note: data.orderNote,
						},
					},
					{
						onSuccess: (res) => {
							if (res.status === 'success') {
								toast.success('Order created successfully');
								setTimeout(() => {
									router.push(`/thank-you/${res.id}`);
									store.dispatch(deleteCart({}));
									store.dispatch(deleteShipping({}));
								}, 1200);
							}
						},
					},
				);
			} catch (error: any) {
				toast.error(error.message);
			}
		} else {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div id="checkout" className="py-24 border-b-2 border-gray-light">
				<div className="container mx-auto">
					{cartItem.length > 0 ? (
						<form
							onSubmit={handleSubmit(onSubmit)}
							id="shippingForm"
						>
							<div className="grid md:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
								<div className="billing-form">
									<ShippingForm
										register={register}
										errors={errors}
										setValue={setValue}
									/>
								</div>
								<div className="order-items">
									<OrderItems />
									<Payment loading={isLoading} />
								</div>
							</div>
						</form>
					) : (
						<div className="flex flex-col items-center">
							<div className="box-shadow h-24 w-24 flex items-center justify-center rounded-full">
								<FiShoppingBag className="text-5xl text-black" />
							</div>

							<h2 className="text-black md:text-4xl font-mulish text-xl font-bold my-8">
								Your cart is Empty
							</h2>

							<Link
								href="/shop"
								className="inline-block bg-orange-dark text-white uppercase text-base px-6 py-3"
							>
								Countinue shopping now
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CheckoutBody;
