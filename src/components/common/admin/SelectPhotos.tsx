import { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiLink, HiOutlineTrash } from 'react-icons/hi';
import { BiImageAdd } from 'react-icons/bi';
import ImageUploader from './ImageUploader';
import { IoIosImages } from 'react-icons/io';
import { FiUploadCloud } from 'react-icons/fi';
import Picture from '../shared/Picture';
import { useFetchData } from 'src/hooks/useApi';
import { ImagesType } from 'src/types';
import Spinner from '../shared/Spinner';
import CustomPagination from '../shared/CustomPagination';
import Empty from './Empty';
import { toast } from 'react-toastify';
import { Modal, Tabs } from 'flowbite-react';

type SelectPhotosType = {
	btnText: string;
	handler: (value: string[]) => void;
	single: boolean;
	defaultVal: string[];
	btnClass: string;
};

const SelectPhotos: React.FC<SelectPhotosType> = ({
	btnText,
	handler,
	single,
	defaultVal,
	btnClass,
}) => {
	const [show, setShow] = useState(false);
	const [page, setPage] = useState(1);
	const [photos, setPhotos] = useState<string[]>(defaultVal || []);
	const [error, setError] = useState<string | null>(null);
	const handleSelect = (name: string) => {
		const index = photos.indexOf(name);
		if (single) {
			setPhotos([name]);
		} else {
			if (index === -1) {
				setError('');
				setPhotos((oldItems: string[]) => [...oldItems, name]);
			} else {
				setError('Already Selected');
				setPhotos([...photos]);
			}
		}
	};
	const handleRemoveSelect = (name: string) => {
		const afterRemove = photos.filter(
			(item) => item.toLocaleLowerCase() !== name.toLocaleLowerCase(),
		);
		setPhotos(afterRemove);
		handler(afterRemove);
	};
	const handleInsert = () => {
		setShow(false);
		handler(photos);
	};
	const { data: images, isLoading } = useFetchData(
		`/api/file/images?page=${page}&limit=6`,
		'images',
		page,
	);

	const handleLinkCopy = (link: string) => {
		navigator.clipboard.writeText(`/uploads/${link}`);
		toast.success('Link Copied');
	};

	return (
		<>
			<div id="select-photos" className="w-full">
				<button
					type="button"
					className={`bg-orange-dark text-white font-medium text-sm uppercase py-3 px-6 btn-shadow rounded-[5px] flex items-center gap-2 ${
						btnClass ? btnClass : ''
					}`}
					onClick={() => setShow(true)}
				>
					<FiUploadCloud className="text-xl" />
					{btnText}
				</button>
				<Modal
					show={show}
					size="6xl"
					popup={true}
					onClose={() => setShow(false)}
					className="!z-[90]"
				>
					<Modal.Header />
					<Modal.Body className="!p-0 overflow-hidden rounded-xl">
						<div className="photos-wrapper px-12">
							<div className="pb-8 flex items-center justify-between">
								<h3 className="text-[#000] text-2xl font-bold">
									Select Photo
								</h3>
							</div>
							<Tabs.Group
								aria-label="Account Setting"
								style="underline"
								className="account-setting"
							>
								<Tabs.Item
									active={true}
									icon={IoIosImages}
									title="Photos"
									className="custom-class"
								>
									{isLoading ? (
										<div className="flex items-center justify-center h-[450px]">
											<Spinner />
										</div>
									) : (
										<div className="photos">
											{images.data.length > 0 ? (
												<>
													<div className="grid grid-cols-3 gap-4">
														{images.data.map(
															(
																item: ImagesType,
																index: number,
															) => (
																<div
																	className="photo-wrapper relative overflow-hidden cursor-pointer group rounded-2xl border"
																	key={index}
																>
																	<Picture
																		link={`/uploads/${item.name}`}
																		classList={
																			'w-[60%] h-[220px] rounded-2xl mx-auto'
																		}
																		alt={
																			'Photo Gallery'
																		}
																	/>
																	<div className="photo-overlay absolute top-0 left-0 bg-[#24282857] w-full h-full items-center justify-center gap-3 duration-300 opacity-0 hidden group-hover:opacity-100 group-hover:flex">
																		<button
																			type="button"
																			className="bg-orange-dark h-9 w-9 flex items-center justify-center rounded-full duration-300 hover:scale-[1.2]"
																			onClick={() =>
																				handleSelect(
																					item.name,
																				)
																			}
																		>
																			<AiOutlineCheck className="text-xl text-[#F0F1FF]" />
																		</button>
																		<button
																			type="button"
																			className="bg-orange-dark h-9 w-9 flex items-center justify-center rounded-full duration-300 hover:scale-[1.2]"
																			onClick={() =>
																				handleLinkCopy(
																					item.name,
																				)
																			}
																		>
																			<HiLink className="text-xl text-[#F0F1FF]" />
																		</button>
																	</div>
																</div>
															),
														)}
													</div>
													<div className="flex items-center justify-end py-7">
														<CustomPagination
															currentpage={
																images.currentPage
															}
															totalPage={
																images.pages
															}
															handler={setPage}
														/>
													</div>
												</>
											) : (
												<Empty
													text={'No Image Found'}
												/>
											)}
										</div>
									)}
									{photos.length > 0 && (
										<div className="select-photos flex items-center justify-between border-t border-t-[#EAEDF7] py-3">
											<div className="flex items-center gap-2">
												{photos.map(
													(item: string, index) => (
														<div
															className="relative overflow-hidden rounded-xl"
															key={index}
														>
															<Picture
																link={`/uploads/${item}`}
																classList={
																	'h-16 w-16 rounded-xl'
																}
																alt={item}
															/>
															<div className="photo-overlay absolute bg-[#24282857] w-full h-full flex items-center justify-center group">
																<button
																	type="button"
																	className="opacity-0 duration-300 hidden group-hover:opacity-100 group-hover:block"
																	onClick={() =>
																		handleRemoveSelect(
																			item,
																		)
																	}
																>
																	<HiOutlineTrash className="text-xl text-[#fff]" />
																</button>
															</div>
														</div>
													),
												)}
											</div>
											<div className="pt-3">
												{error ? (
													<span className="text-end block pb-2 text-sm font-semibold text-red-400">
														{error}
													</span>
												) : (
													<span className="text-end block pb-2 text-sm font-semibold text-[#200]">
														{photos.length} items
														selected
													</span>
												)}
												<div className="flex items-center gap-4">
													<button
														type="button"
														className="border-2 border-orange-dark rounded-[5px] py-[10px] px-6 text-base uppercase text-orange-dark font-medium hover:bg-orange-dark hover:text-white"
														onClick={() => [
															setPhotos([]),
															handler([]),
														]}
													>
														Clear
													</button>
													<button
														type="button"
														className="border-2 border-orange-dark rounded-[5px] py-[10px] px-6 text-base uppercase text-orange-dark font-medium hover:bg-orange-dark hover:text-white"
														onClick={handleInsert}
													>
														Insert Photo
													</button>
												</div>
											</div>
										</div>
									)}
								</Tabs.Item>
								<Tabs.Item
									active={true}
									icon={BiImageAdd}
									title="Upload"
									className="custom-class"
								>
									<div className="w-[370px] h-[500px] mx-auto flex flex-col gap-3 items-center justify-center pb-6">
										<ImageUploader />
									</div>
								</Tabs.Item>
							</Tabs.Group>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};
export default SelectPhotos;
