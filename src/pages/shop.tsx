import CustomPagination from 'src/components/common/shared/CustomPagination';
import ProductCard from 'src/components/common/shared/ProductCard';
import Spinner from 'src/components/common/shared/Spinner';
import DefaultLayout from 'src/components/layouts/DefaultLayout';
import { ProductType } from 'src/types';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import { BsShop } from 'react-icons/bs';
import { FiGrid } from 'react-icons/fi';
import { TbListDetails } from 'react-icons/tb';
import { useFetchData, useShopFetchData } from 'src/hooks/useApi';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Picture from 'src/components/common/shared/Picture';

const Shop = () => {
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState<string[]>([]);
	const [sort, setSort] = useState<string>('sort=1');

	const { data: products, isLoading } = useShopFetchData(
		`/api/product/shop?limit=6&page=${page}&${filter.join('&')}&${sort}`,
		`products`,
		page,
		filter.join('&'),
		sort,
	);

	const { register, handleSubmit } = useForm();

	const onSubmit = handleSubmit(async (fill) => {
		const arr = [];
		if (fill.search.length) {
			arr.push(`s=${fill.search}`);
		}
		if (fill.category) {
			arr.push(`cat=${fill.category}`);
		}
		if (fill.price) {
			const prices = fill.price.split('-');
			arr.push(`min=${prices[0]}&max=${prices[1]}`);
		}
		setFilter(arr);
		setPage(1);
	});

	const handeProductSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSort(`sort=${event.target.value}`);
	};

	return (
		<>
			<Head>
				<title>Lisk - Shop</title>
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
			<div id="shop" className="border-0 border-b-2 bg-gray-light">
				{isLoading ? (
					<div className="flex items-center justify-center h-[450px]">
						<Spinner />
					</div>
				) : products.status === 'success' ? (
					<div className="container mx-auto py-24">
						<div className="shop__wrapper grid md:grid-cols-4 grid-cols-1 lg:gap-7 md:gap-4">
							<div className="sidebar col-span-1">
								<div className="sidebar__wrapper bg-white py-8 px-7">
									<form onChange={onSubmit}>
										<h3 className="text-xl font-semibold text-black mb-6">
											Search Products
										</h3>
										<div className="input__group">
											<label
												htmlFor="search"
												className="input__label mb-2"
											>
												Search Text
											</label>
											<input
												{...register('search')}
												type="text"
												className="input__field"
												id="search"
											/>
										</div>
										<div className="input__group mt-4">
											<label
												htmlFor="category"
												className="input__label mb-2"
											>
												Filter Category
											</label>
											<select
												id="category"
												{...register('category')}
												className="input__field "
											>
												<option value="">
													Select Category
												</option>
												{products.categorys.length >
												0 ? (
													products.categorys.map(
														(
															item: {
																_id: string;
																title: string;
															},
															index: number,
														) => (
															<option
																value={item._id}
																key={index}
															>
																{item.title}
															</option>
														),
													)
												) : (
													<option>
														Select Category
													</option>
												)}
											</select>
										</div>
										<div className="input__group mt-4">
											<label
												htmlFor="price"
												className="input__label mb-2"
											>
												Filter by Price
											</label>
											<select
												className="input__field"
												id="price"
												{...register('price')}
											>
												<option value="">
													Select Price
												</option>
												<option value="20-100">
													$20.00 - $100.00
												</option>
												<option value="100-200">
													$100.00 - $200.00
												</option>
												<option value="200-300">
													$200.00 - $300.00
												</option>
												<option value="300-400">
													$300.00 - $400.00
												</option>
												<option value="400-100000">
													$400.00 - ???
												</option>
											</select>
										</div>
										<Link
											href="https://www.hostg.xyz/aff_c?offer_id=6&aff_id=129384&file_id=1379"
											target="_blank"
											className="block mt-10"
										>
											<Picture
												link={'/ad-banner.jpg'}
												classList={'w-full'}
												alt={''}
											/>
										</Link>
									</form>
								</div>
							</div>
							<div className="shop__products col-span-3 md:mt-0 mt-6">
								{products.data.length > 0 ? (
									<div className="shop-product__wrapper font-mulish">
										<div className="shop-product__header">
											<div className="shop-product__filter-items bg-white py-3 px-4 flex justify-between items-center gap-4">
												<div className="flex items-center gap-6">
													<button className="bg-[#EAEDF7] p-[5px]">
														<FiGrid className="text-black text-[25px]" />
													</button>
													<button>
														<TbListDetails className="text-black text-[25px]" />
													</button>
												</div>
												<div className="search-result flex items-center gap-8">
													<p className="short-subtitle">
														1 - {products.length} of
														5 Results
													</p>
													<select
														id="countries"
														className="bg-gray-light text-black font-medium text-base border-0 focus:ring-0"
														onChange={
															handeProductSort
														}
													>
														<option value="">
															Product Sort By
															Price
														</option>
														<option value="1">
															Price Low to High
														</option>
														<option value="-1">
															Price High to Low
														</option>
													</select>
												</div>
											</div>
										</div>
										{/* shop products */}
										<div className="shop-products mt-8 bg-gray-light">
											<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 pb-5">
												{products.data.map(
													(
														product: ProductType,
														index: number,
													) => (
														<ProductCard
															template={product}
															key={index}
														/>
													),
												)}
											</div>
											{products.pages > 1 && (
												<CustomPagination
													currentpage={
														products.currentPage
													}
													totalPage={products.pages}
													handler={setPage}
												/>
											)}
										</div>
									</div>
								) : (
									<div className="flex flex-col items-center py-24">
										<div className="box-shadow h-24 w-24 flex items-center justify-center rounded-full">
											<BsShop className="text-5xl text-black" />
										</div>

										<h2 className="text-black md:text-4xl font-mulish text-xl font-bold my-8">
											Store is Empty
										</h2>
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center py-24">
						<div className="box-shadow h-24 w-24 flex items-center justify-center rounded-full">
							<BsShop className="text-5xl text-black" />
						</div>

						<h2 className="text-black md:text-4xl font-mulish text-xl font-bold my-8">
							Store is Empty
						</h2>
					</div>
				)}
			</div>
		</>
	);
};

Shop.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
export default Shop;
