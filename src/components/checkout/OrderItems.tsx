import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Picture from '../common/shared/Picture';
import { RootState } from 'src/redux/store';

const OrderItems = () => {
	const { cartItem } = useSelector((state: RootState) => state.cart);

	return (
		<>
			<div className="total-orders font-mulish">
				<h3 className="text-black text-2xl font-bold mb-14">
					Your Order
				</h3>
				<div className="mb-2">
					{cartItem.map((item, index: number) => (
						<div
							className="order-item__list font-mulish"
							key={index}
						>
							<div className="cart-items font-mulish border border-gray-light p-5 rounded-md mb-3">
								<div className="flex items-center md:flex-row flex-col lg:gap-8 gap-4">
									<div>
										<Picture
											link={`/uploads/${item.thumbnail}`}
											alt={item.title}
											classList={
												'h-[65px] w-[65px] rounded-md'
											}
										/>
									</div>
									<h4 className="text-black font-bold text-base md:text-left text-center flex-1">
										{item.title}
									</h4>
									<p className="flex items-center">
										<span className="text-xl font-semibold">
											{item.qty}
										</span>
										<FaTimes className="text-sm mt-1" />
									</p>
									<div>
										<p className="sale-price text-black text-lg font-semibold">
											${item.qty * item.salePrice}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default OrderItems;
