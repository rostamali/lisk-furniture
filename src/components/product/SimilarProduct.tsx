import { ProductCardType } from 'src/types';
import ProductCard from '../common/shared/ProductCard';

const SimilarProduct = ({ products }: { products: ProductCardType[] }) => {
	return (
		<>
			<div
				id="viewd-products"
				className="bg-gray-light py-24 font-mulish"
			>
				<div className="container mx-auto">
					<div className="viewed-product__wrapper">
						<h2 className="text-center text-black lg:text-2xl text-2xl font-bold capitalize pb-8">
							Similar products
						</h2>
						<div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 md:gap-6">
							{products.map((product, index) => (
								<div key={index}>
									<ProductCard template={product} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SimilarProduct;
