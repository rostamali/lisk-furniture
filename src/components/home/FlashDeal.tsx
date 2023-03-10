import Picture from '../common/shared/Picture';
import { ProductCardType } from 'src/types';
import ProductCard from '../common/shared/ProductCard';
import Link from 'next/link';

const FlashDeal = ({ flashDealItem, countDown }: any) => {
	return (
		<>
			<div id="flash-deal" className="bg-gray-light pb-24">
				<div className="container mx-auto">
					<div className="grid lg:grid-cols-2 lg:gap-8 gap-4">
						<div className="bg-white border-2 border-orange-dark p-6 lg:-p-10">
							<Link href={`/product/${countDown.slug}`}>
								<div className="flash-deal__product font-mulish">
									<h3 className="text-black lg:text-3xl text-2xl font-extrabold">
										Flash Deals
									</h3>
									<div className="my-8">
										<Picture
											link={`/uploads/${countDown.thumbnail}`}
											alt={'Product thumbnail'}
											classList={'mx-auto w-[80%]'}
										/>
									</div>

									<h3 className="text-black font-extrabold lg:text-3xl text-center md:text-xl text-lg">
										{countDown.title}
									</h3>
									<p className="text-orange-dark lg:text-2xl text-lg font-bold text-center lg:my-6 my-4">
										${countDown.salePrice.toFixed(2)}
									</p>
									<div className="lg:my-6 my-4">
										<div className="progress-bar lg:px-24 px-3">
											<div className="flex items-center justify-between mb-2">
												<p className="font-mulish md:text-base text-gray-dark text-sm">
													Already Sold:{' '}
													{countDown.sold}
												</p>
												<p className="font-mulish md:text-base text-gray-dark text-sm">
													Available: {countDown.stock}
												</p>
											</div>
											<div className="h-4 w-full bg-gray-light rounded-3xl">
												<div
													style={{
														width: `70`,
													}}
													className={`h-full rounded-3xl ${
														70 < 70
															? 'bg-red-600'
															: 'bg-orange-dark'
													}`}
												></div>
											</div>
										</div>
									</div>
								</div>
							</Link>
						</div>
						<div className="flash-deal__products">
							<div className="grid sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
								{flashDealItem.length > 0 &&
									flashDealItem.map(
										(
											item: ProductCardType,
											index: number,
										) => (
											<div key={index}>
												<ProductCard template={item} />
											</div>
										),
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FlashDeal;
