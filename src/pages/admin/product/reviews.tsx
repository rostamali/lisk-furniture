import AdminPageTitle from 'src/components/common/admin/AdminPageTitle';
import Empty from 'src/components/common/admin/Empty';
import CustomPagination from 'src/components/common/shared/CustomPagination';
import Picture from 'src/components/common/shared/Picture';
import Spinner from 'src/components/common/shared/Spinner';
import AdminAuthLayout from 'src/components/layouts/AdminAuthLayout';
import { useFetchData } from 'src/hooks/useApi';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import { useUpdateData } from '../../../hooks/useApi';
import { GiCheckMark } from 'react-icons/gi';

type reviewType = {
	active: boolean;
	createdAt: Date;
	name: string;
	product: {
		_id: string;
		title: string;
		thumbnail: string;
	};
	rating: number;
	review: string;
	_id: string;
};

const Reviews = () => {
	const [page, setPage] = useState(1);
	const { data: reviews, isLoading } = useFetchData(
		`/api/review/all?limit=9&page=${page}`,
		'reviews',
		page,
	);
	const { mutate: approveReview } = useUpdateData('reviews');

	const handleApproveReview = (id: string) => {
		approveReview({
			url: `api/review/approve/${id}`,
			body: {},
		});
	};

	return (
		<>
			<Head>
				<title>Product Reviews</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
			</Head>
			<div className="reviews">
				<div className="pb-8">
					<AdminPageTitle
						title={'Reviews'}
						subtitle={'Admin / Product / Reviews'}
					/>
				</div>

				<div className="bg-white p-10 rounded-lg">
					{isLoading ? (
						<div className="flex h-[60vh] items-center justify-center">
							<Spinner />
						</div>
					) : (
						reviews.status === 'success' &&
						(reviews.data.length > 0 ? (
							<>
								<table className="w-full border-collapse">
									<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
										<tr>
											<th className="text-left py-3 pl-3">
												Image
											</th>
											<th className="text-left py-3">
												Product name
											</th>
											<th className="text-left py-3">
												User
											</th>
											<th className="text-left py-3">
												Date
											</th>
											<th className="text-left py-3">
												Rating
											</th>
											<th className="text-left py-3">
												Status
											</th>
											<th className="text-center py-3 pr-3">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{reviews.data.map(
											(
												item: reviewType,
												index: number,
											) => (
												<tr
													className="border border-[#F0F1FF] mb-2"
													style={{
														marginBottom: '10px',
													}}
													key={index}
												>
													<td className="pl-3 py-3">
														<Picture
															link={`/uploads/${item.product.thumbnail}`}
															classList={
																'h-8 w-8'
															}
															alt={
																item.product
																	.title
															}
														/>
													</td>
													<td className="py-3">
														{item.product.title.substr(
															0,
															30,
														)}
														...
													</td>
													<td className="py-3">
														{item.name}
													</td>
													<td className="py-3">
														{new Date(
															item.createdAt,
														).toLocaleString(
															'en-US',
															{
																timeZone: 'UTC',
																weekday:
																	'short',
																year: 'numeric',
																month: 'short',
																day: 'numeric',
															},
														)}
													</td>
													<td className="py-3">
														{item.rating}
													</td>
													<td className="py-3">
														<span className="bg-green-300 text-[#000] text-sm py-1 px-2 rounded-md capitalize">
															{item.active
																? 'Approve'
																: 'Pending'}
														</span>
													</td>
													<td className="py-3 flex items-center justify-center">
														<button
															onClick={() =>
																handleApproveReview(
																	item._id,
																)
															}
															className="action__delete"
														>
															<GiCheckMark />
														</button>
													</td>
												</tr>
											),
										)}
									</tbody>
								</table>
								{reviews.pages > 1 && (
									<div className="flex items-center justify-end pt-8">
										<CustomPagination
											currentpage={reviews.currentPage}
											totalPage={reviews.pages}
											handler={setPage}
										/>
									</div>
								)}
							</>
						) : (
							<Empty text="No Review Found" />
						))
					)}
				</div>
			</div>
		</>
	);
};
Reviews.getLayout = function getLayout(page: ReactElement) {
	return <AdminAuthLayout>{page}</AdminAuthLayout>;
};
export default Reviews;
