import Link from 'next/link';
import { BsCartCheck } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import Picture from './Picture';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { ProductCardType } from 'src/types';
import { addToCart } from 'src/redux/slices/cartSlice';

const ProductCard = ({ template }: { template: ProductCardType }) => {
	const dispatch = useDispatch();
	const { cartItem } = useSelector((state: RootState) => state.cart);

	return (
		<>
			<div className="bg-white font-mulish p-4 relative">
				{template.badge && (
					<span className="absolute right-0 bg-orange-dark text-white text-xs inline-block py-1 px-2 top-2/4 z-[8]">
						{template?.badge}
					</span>
				)}
				{template.stock === null && (
					<span className="absolute right-0 bg-red-500 text-white text-xs inline-block py-1 px-2 top-0 z-[8]">
						Out of stock
					</span>
				)}
				<span className="text-gray-dark text-xs uppercase">
					{template?.category.title}
				</span>
				<Link href={`/product/${template.slug}`}>
					<h4 className="text-black font-bold text-base mt-2">
						{template?.title.substr(0, 25)}...
					</h4>
				</Link>
				<Link href={`/product/${template.slug}`}>
					<div className="flex justify-center py-2">
						<Picture
							link={`/uploads/${template?.thumbnail}`}
							alt={'Product'}
							classList={
								'py-4 h-[230px] md:w-full sm:w-3/4 w-full'
							}
						/>
					</div>
				</Link>
				<div className="flex items-center justify-between">
					<div className="prices flex items-center">
						<p className="regular-price line-through font-medium text-gray-dark text-sm">
							{template?.regularPrice &&
								`$${template.regularPrice.toFixed(2)}`}
						</p>
						<p className="sale-price text-green-success text-lg font-medium ml-2">
							{template?.salePrice &&
								`$${template?.salePrice.toFixed(2)}`}
						</p>
					</div>
					{cartItem.find(
						(item: any) => item._id === template?._id,
					) ? (
						<Link href="/cart">
							<BsCartCheck className="text-orange-dark text-lg" />
						</Link>
					) : (
						template.stock !== null && (
							<button
								onClick={() => dispatch(addToCart(template))}
							>
								<FiShoppingBag className="text-gray-dark text-lg" />
							</button>
						)
					)}
				</div>
			</div>
		</>
	);
};
//
export default ProductCard;
