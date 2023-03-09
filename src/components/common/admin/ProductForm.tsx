import dynamic from 'next/dynamic';
import { useState } from 'react';
import SelectPhotos from './SelectPhotos';
import Picture from '../shared/Picture';
import { useForm } from 'react-hook-form';
import { useCreateData } from 'src/hooks/useApi';
import { ProductCategory } from '../../../pages/admin/product/new-product';
import { toast } from 'react-toastify';
import ButtonLoader from '../shared/ButtonLoader';
import { yupResolver } from '@hookform/resolvers/yup';
import { productForm } from 'src/utils/validators';
import { ErrorMessage } from '@hookform/error-message';
const TextEditor = dynamic(() => import('./TextEditor'), {
	ssr: false,
});

const ProductForm = ({ category }: { category: ProductCategory[] }) => {
	const [description, setDescription] = useState<any>();
	const [image, setImage] = useState<string[]>([]);
	const [gallery, setGallery] = useState<string[]>([]);

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(productForm),
	});
	const { mutate: createProduct, isLoading } = useCreateData(
		'/api/product/create',
		'product',
	);

	const onSubmit = async (data: any) => {
		data.thumbnail = image[0];
		data.gallery = gallery;
		data.description = description;
		if (!data.thumbnail) return toast.error('Thumbnail is required');
		if (!data.name) return toast.error('Name is required');
		createProduct(data);
	};
	console.log(errors);
	return (
		<>
			<div className="product-form">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-4 gap-8">
						<div className="col-span-3 bg-white p-10 rounded-lg">
							<div className="grid grid-cols-2 gap-8">
								{Fields.map((item, index) => (
									<div className="input__group" key={index}>
										<label
											htmlFor={item.id}
											className="input__label"
										>
											{item.label}
										</label>
										{item.type === 'number' ? (
											<>
												<input
													id={item.id}
													type="number"
													className={`input__field ${
														item.class
															? item.class
															: ''
													}`}
													min={0}
													{...register(item.id)}
												/>
												{item.id === 'regularPrice' && (
													<span className="text-xs text-red-500">
														{watch('regularPrice')
															? parseInt(
																	watch(
																		'salePrice',
																	),
															  ) >
															  parseInt(
																	watch(
																		'regularPrice',
																	),
															  )
																? 'Regular Price must be greater than Sale price'
																: ''
															: ''}
													</span>
												)}
												<ErrorMessage
													errors={errors}
													name={item.id}
													render={({ message }) => (
														<p className="text-red-500 text-base italic font-medium font-mulish">
															{message}
														</p>
													)}
												/>
											</>
										) : (
											<>
												<input
													id={item.id}
													type="text"
													className={`input__field ${
														item.class
															? item.class
															: ''
													}`}
													{...register(item.id)}
												/>
												<ErrorMessage
													errors={errors}
													name={item.id}
													render={({ message }) => (
														<p className="text-red-500 text-base italic font-medium font-mulish">
															{message}
														</p>
													)}
												/>
											</>
										)}
									</div>
								))}
							</div>
							<div className="pt-8">
								<span className="input__label mb-2 block">
									Description
								</span>
								<TextEditor
									defaultVal={undefined}
									handler={setDescription}
								/>
							</div>
						</div>
						<div className="col-span-1 bg-white p-10 rounded-lg">
							<div className="input__group">
								<label
									htmlFor="category"
									className="input__label"
								>
									Category
								</label>
								<select
									id="category"
									className="input__field"
									{...register('category')}
								>
									<option value="">Default</option>
									{category.length > 0 &&
										category.map((item, index) => (
											<option
												value={item._id}
												key={index}
												className="capitalize"
											>
												{item.title}
											</option>
										))}
								</select>
								<ErrorMessage
									errors={errors}
									name={'category'}
									render={({ message }) => (
										<p className="text-red-500 text-base italic font-medium font-mulish">
											{message}
										</p>
									)}
								/>
							</div>
							<div className="input__group mt-4">
								<label
									htmlFor="saleType"
									className="input__label"
								>
									Sale Type
								</label>
								<select
									id="saleType"
									className="input__field"
									{...register('saleType')}
									defaultValue={'default'}
								>
									<option value="default">Default</option>
									<option value="feature">Feature</option>
									<option value="flash-deal">
										Flash Deal
									</option>
								</select>
							</div>
							<div className="input__group mb-8 mt-4">
								<div className="flex flex-col items-start justify-center gap-4 w-full">
									{image.length ? (
										<Picture
											link={`/uploads/${image[0]}`}
											classList={
												'h-[200px] w-full rounded-md relative'
											}
											alt={'product'}
										/>
									) : (
										<div className="border-2 border-dashed border-orange-dark w-full h-[200px] rounded-md flex items-center justify-center">
											Product Thumbnail
										</div>
									)}
									<SelectPhotos
										btnText={'Select Image'}
										handler={setImage}
										single={true}
										defaultVal={image}
										btnClass={'w-full block justify-center'}
									/>
								</div>
							</div>
							<div className="input__group">
								<div className="flex items-center flex-col gap-4">
									{gallery.length ? (
										<div className="flex flex-wrap gap-3 ">
											{gallery.map((item, index) => (
												<div key={index}>
													<Picture
														link={`/uploads/${item}`}
														classList={
															'h-20 w-[85px] rounded-md relative'
														}
														alt={'product'}
													/>
												</div>
											))}
										</div>
									) : (
										<div className="border-2 border-dashed border-orange-dark w-full h-[200px] rounded-md flex items-center justify-center">
											Product Gallery
										</div>
									)}
									<SelectPhotos
										btnText={'Select Gallery'}
										handler={setGallery}
										single={false}
										defaultVal={gallery}
										btnClass={'w-full justify-center'}
									/>
								</div>
							</div>
							<button
								className="submit__btn w-full mt-8 h-[50px]"
								disabled={isLoading}
							>
								{isLoading ? <ButtonLoader /> : 'Add Product'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

const Fields = [
	{
		label: 'Name',
		type: 'text',
		id: 'name',
	},
	{
		label: 'Badge',
		type: 'text',
		id: 'badge',
	},
	{
		label: 'Regular Price',
		type: 'number',
		id: 'regularPrice',
	},
	{
		label: 'Sale Price',
		type: 'number',
		id: 'salePrice',
	},
	{
		label: 'SKU',
		type: 'text',
		id: 'sku',
		class: 'uppercase',
	},
	{
		label: 'Stock',
		type: 'number',
		id: 'stock',
	},
];

export default ProductForm;
