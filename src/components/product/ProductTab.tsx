import { Tabs } from 'flowbite-react';
import Picture from '../common/shared/Picture';
import Ratings from '../common/shared/Ratings';

type ProductTabType = {
	description: string;
	id: string;
	reviews: [
		{
			user: {
				userName: string;
				thumbnail: string;
			};
			rating: number;
			review: string;
			createdAt: Date;
		},
	];
};

const ProductTab: React.FC<ProductTabType> = ({ description, id, reviews }) => {
	return (
		<>
			<div className="font-mulish pb-16">
				<Tabs.Group
					aria-label="Default tabs"
					style="default"
					className="flex items-center justify-center w-full product-tab"
				>
					<Tabs.Item active title="Description">
						<div className="container mx-auto pt-10">
							<article
								className="product-description"
								dangerouslySetInnerHTML={{
									__html: description
										? description.replace(
												/<p>(\s|&nbsp;)*<\/p>/g,
												'&nbsp;',
										  )
										: '',
								}}
							></article>
						</div>
					</Tabs.Item>
					{reviews.length > 0 ? (
						<Tabs.Item title="Reviews" className="w-full">
							<div className="container mx-auto pt-10">
								<div className="reviews grid grid-cols-3 gap-6">
									{reviews.map((item, index) => (
										<div
											className="user-review bg-gray-light py-6 px-6"
											key={index}
										>
											<div className="user-info flex items-center gap-3">
												<Picture
													link={
														item.user.thumbnail
															? `/uploads/${item.user.thumbnail}`
															: '/uploads/user.png'
													}
													classList={
														'h-[55px] w-[55px] rounded-full'
													}
													alt={'Review User'}
												/>
												<div className="rating-info">
													<p className="name text-base font-bold text-[#222] capitalize">
														{item.user.userName}
													</p>
													<div className="flex items-center text-sm font-bold text-black gap-2 mt-2">
														<Ratings
															rating={item.rating}
															size={'17px'}
														/>
														<span>
															{item.rating}
														</span>
													</div>
												</div>
											</div>
											<p className="text-[#78726d] text-sm font-medium pt-3">
												{item.review.substr(0, 180)}...
											</p>
										</div>
									))}
								</div>
							</div>
						</Tabs.Item>
					) : (
						''
					)}
				</Tabs.Group>
			</div>
		</>
	);
};

export default ProductTab;
