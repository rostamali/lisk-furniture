import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from 'src/redux/store';

const CartTotal = () => {
	const { cartSubTotal } = useSelector((state: RootState) => state.cart);

	return (
		<>
			<div className="cart-totals__wrapper bg-gray-light font-mulish px-5 pt-8 pb-4 rounded-md">
				<h4 className="text-center text-black text-xl font-bold mb-5">
					Cart Total
				</h4>
				{/* subtotals */}
				<div
					className="subtotal flex items-center justify-between py-3"
					style={{
						borderTop: '1px solid #eee',
						borderBottom: '1px solid #eee',
					}}
				>
					<p className="subtotal-label text-black text-base font-medium">
						Subtotal
					</p>
					<p className="subtotal-value text-gray-thin text-base font-medium">
						${cartSubTotal.toFixed(2)}
					</p>
				</div>
				{/* Shipping Form */}
				<div className="flex justify-between my-6 lg:gap-8 gap-4">
					<p className="subtotal-label text-black font-medium text-base">
						Shipping
					</p>
					<p className="subtotal-value text-gray-thin text-base font-medium">
						0
					</p>
				</div>
				{/* totals */}
				<div
					className="total flex items-center justify-between py-3"
					style={{
						borderTop: '1px solid #eee',
						borderBottom: '1px solid #eee',
					}}
				>
					<p className="subtotal-label text-black font-medium text-base">
						Total
					</p>
					<p className="subtotal-value text-black font-semibold text-xl">
						${cartSubTotal.toFixed(2)}
					</p>
				</div>
				<Link
					href="/checkout"
					className="btn-shadow bg-orange-dark text-white uppercase text-base tracking-wider py-3 rounded w-full block text-center mt-6"
				>
					Proceed to checkout
				</Link>
			</div>
		</>
	);
};

export default CartTotal;
