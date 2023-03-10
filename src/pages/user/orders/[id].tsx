import Empty from 'src/components/common/admin/Empty';
import Picture from 'src/components/common/shared/Picture';
import Spinner from 'src/components/common/shared/Spinner';
import UserAuthLayout from 'src/components/layouts/UserAuthLayout';
import { useCreateData, useFetchData } from 'src/hooks/useApi';
import Head from 'next/head';
import React, { ReactElement, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Modal } from 'flowbite-react';
import StarRatings from 'react-star-ratings';
import { MdRateReview } from 'react-icons/md';
import ButtonLoader from 'src/components/common/shared/ButtonLoader';

const UserOrderDetails = ({ id }: { id: string }) => {
	const { data: details, isLoading } = useFetchData(
		`/api/order/${id}`,
		id,
		1,
	);
	// write review
	const [rating, setRating] = useState(0);
	const [show, setShow] = useState({
		open: false,
		id: '',
	});
	const { mutate, isLoading: isCreating } = useCreateData(
		'/api/review/create',
		'',
	);
	const { register, handleSubmit, setValue, reset } = useForm({
		mode: 'onChange',
	});
	const onSubmit = handleSubmit(async (review) => {
		review.id = show.id;
		mutate(review, {
			onSuccess: (res) => {
				console.log(res);
				setRating(0);
				setShow({
					open: false,
					id: '',
				});
				reset();
			},
		});
	});

	return (
		<>
			<Head>
				<title>Order Details</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isLoading ? (
				<Spinner />
			) : details.status === 'success' ? (
				<div className="user-order-details">
					<h3 className="user-page-title">
						Order No:
						<span className="text-[#6259CA] pl-2">
							{details.data._id}
						</span>
					</h3>
					<table className="w-full border-collapse">
						<thead className="bg-[#F0F1FF] border border-[#F0F1FF]">
							<tr>
								<th className="text-left py-3 pl-3">Image</th>
								<th className="text-left py-3">Name</th>
								<th className="text-left py-3">Price</th>
								<th className="text-center py-3">QTY</th>
								<th className="text-center py-3">Total</th>
								<th className="text-center py-3 pr-3">
									Review
								</th>
							</tr>
						</thead>
						<tbody>
							{details.data.ordersItems.map(
								(
									item: {
										id: {
											_id: string;
											title: string;
											thumbnail: string;
											salePrice: number;
										};
										price: number;
										qty: number;
									},
									index: number,
								) => (
									<tr
										className="border border-[#F0F1FF] mb-2"
										style={{
											marginBottom: '10px',
										}}
										key={index}
									>
										<td className="py-2 pl-3">
											<Picture
												link={`/uploads/${item.id.thumbnail}`}
												classList={
													'h-[45px] w-[45px] rounded-lg'
												}
												alt={''}
											/>
										</td>
										<td>{item.id.title}</td>
										<td>${item.price.toFixed(2)}</td>
										<td className="text-center">
											{item.qty}
										</td>
										<td className="text-center">
											$
											{(item.price * item.qty).toFixed(2)}
										</td>
										<td className="">
											<button
												className="action__delete mx-auto"
												onClick={() =>
													setShow({
														open: true,
														id: item.id._id,
													})
												}
											>
												<MdRateReview className="text-[#000] text-base" />
											</button>
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>
					<div className="grid grid-cols-3 pt-8 gap-8">
						<div className="shipping-info">
							<h4 className="text-lg text-black font-bold">
								Shipping Info:
							</h4>
							<div className="flex flex-col gap-2 pt-5">
								<span>
									<strong>Address:</strong>{' '}
									{details.data.shipping.address}
								</span>
								<span>
									<strong>Province:</strong>{' '}
									{details.data.shipping.province}
								</span>
								<span>
									<strong>City:</strong>{' '}
									{details.data.shipping.city}
								</span>
								<span>
									<strong>Area:</strong>{' '}
									{details.data.shipping.area}
								</span>
							</div>
							<button className="submit__btn flex items-center gap-3 mt-6">
								Get Invoice <FaDownload />
							</button>
						</div>
						<div className="">
							{details.data.note && (
								<>
									<h4 className="text-lg text-black font-bold">
										Order Note:
									</h4>
									<p className="text-sm h-[120px] overflow-y-scroll mt-5">
										{details.data.note}
									</p>
								</>
							)}
						</div>
						<ul className="">
							<li className="flex items-center justify-between border-b py-4">
								<span className="order-details-info-label">
									Subtotal
								</span>
								<span className="order-details-info-value">
									$
									{(
										details.data.total -
										details.data.shippingCost
									).toFixed(2)}
								</span>
							</li>
							<li className="flex items-center justify-between border-b py-4">
								<span className="order-details-info-label">
									Shipping
								</span>
								<span className="order-details-info-value">
									${details.data.shippingCost.toFixed(2)}
								</span>
							</li>
							<li className="flex items-center justify-between py-4">
								<span className="order-details-info-label">
									Discount
								</span>
								<span className="order-details-info-value">
									0
								</span>
							</li>
							<li className="border-t-2 pt-4 flex items-center justify-between">
								<span className="text-lg font-semibold text-[#333]">
									Total
								</span>
								<span className="text-lg font-semibold text-[#333]">
									${details.data.total.toFixed(2)}
								</span>
							</li>
						</ul>
					</div>
				</div>
			) : (
				<Empty text={'Invalid Order Number'} />
			)}
			<Modal
				show={show.open}
				size="md"
				popup={true}
				onClose={() =>
					setShow({
						...show,
						open: false,
					})
				}
			>
				<Modal.Header />
				<Modal.Body>
					<form onSubmit={onSubmit}>
						<div className="p-4">
							<h3 className="text-xl font-bold mb-8">
								Write Your Review
							</h3>
							<div className="input__group mb-4">
								<label
									htmlFor="star-ratings"
									className="input__label"
								>
									Rating
								</label>
								<StarRatings
									rating={rating}
									changeRating={(val) => [
										setRating(val),
										setValue('rating', val),
									]}
									starRatedColor="#FAAD3D"
									starDimension="20px"
									starSpacing="5px"
									starHoverColor="#FAAD3D"
								/>
							</div>
							<div className="input__group">
								<label
									htmlFor="review"
									className="input__label"
								>
									Review
								</label>
								<textarea
									{...register('review')}
									id="review"
									className="input__field w-full h-[120px] rounded-md"
								></textarea>
							</div>
							<button
								disabled={isCreating}
								className="w-full bg-[#FAAD3D] text-white h-[50px] rounded-md text-lg mt-5"
							>
								{isCreating ? (
									<ButtonLoader />
								) : (
									'Submit Review'
								)}
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
};
UserOrderDetails.getLayout = function getLayout(page: ReactElement) {
	return <UserAuthLayout>{page}</UserAuthLayout>;
};

export async function getServerSideProps(context: any) {
	const { id } = context.query;
	return {
		props: { id },
	};
}

export default UserOrderDetails;
