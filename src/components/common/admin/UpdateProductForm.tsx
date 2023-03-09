import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import SelectPhotos from './SelectPhotos';
import Picture from '../shared/Picture';
import { useForm } from 'react-hook-form';
import { useUpdateData } from 'src/hooks/useApi';
import { ProductCategory } from '../../../pages/admin/product/new-product';
import { toast } from 'react-toastify';
import ButtonLoader from '../shared/ButtonLoader';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';

const TextEditor = dynamic(() => import('./TextEditor'), {
	ssr: false,
});

const UpdateProductForm = ({
	category,
	product,
}: {
	category: ProductCategory[];
	product: any;
}) => {
	const [description, setDescription] = useState<any>(
		product.description ? product.description : '',
	);
	const [image, setImage] = useState<string[]>([]);
	const [gallery, setGallery] = useState<string[]>([]);

	const { handleSubmit, register, watch, setValue } = useForm();
	const { mutate: updateProduct, isLoading } =
		useUpdateData('single-product');

	const onSubmit = async (data: any) => {
		data.thumbnail = image.length ? image[0] : product.thumbnail;
		data.gallery = gallery.length > 0 ? gallery : product.gallery;
		data.description = description;
		if (!data.thumbnail) return toast.error('Thumbnail is required');
		if (!data.name) return toast.error('Name is required');
		updateProduct({
			url: `/api/product/update/${product._id}`,
			body: data,
		});
	};

	useEffect(() => {
		if (product) {
			setValue('name', product.title);
			setValue('badge', product.badge);
			setValue('regularPrice', product.regularPrice);
			setValue('salePrice', product.salePrice);
			setValue('sku', product.stockUnit);
			setValue('stock', product.stock);
			setValue('category', product.category._id);
			setValue('saleType', product.saleType);
		}
	}, [product, setValue]);

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
											</>
										) : (
											<input
												id={item.id}
												type="text"
												className={`input__field ${
													item.class ? item.class : ''
												}`}
												{...register(item.id)}
											/>
										)}
									</div>
								))}
							</div>
							<div className="pt-8">
								<span className="input__label mb-2 block">
									Description
								</span>
								<TextEditor
									defaultVal={EditorState.createWithContent(
										ContentState.createFromBlockArray(
											convertFromHTML(
												description
													? description.replace(
															/<p>(\s|&nbsp;)*<\/p>/g,
															'&nbsp;',
													  )
													: '',
											).contentBlocks,
											convertFromHTML(
												description
													? description.replace(
															/<p>(\s|&nbsp;)*<\/p>/g,
															'&nbsp;',
													  )
													: '',
											).entityMap,
										),
									)}
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
									required
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
										<Picture
											link={`/uploads/${product.thumbnail}`}
											classList={
												'h-[200px] w-full rounded-md relative'
											}
											alt={'product'}
										/>
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
										<div className="flex flex-wrap gap-3 ">
											{product.gallery.length > 0 &&
												product.gallery.map(
													(
														item: string,
														index: number,
													) => (
														<div key={index}>
															<Picture
																link={`/uploads/${item}`}
																classList={
																	'h-20 w-[85px] rounded-md relative'
																}
																alt={'product'}
															/>
														</div>
													),
												)}
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
								{isLoading ? (
									<ButtonLoader />
								) : (
									'Update Product'
								)}
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
export default UpdateProductForm;
