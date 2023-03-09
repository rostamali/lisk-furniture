import Image from 'next/image';
import { useState } from 'react';
import { IoMdCloudUpload } from 'react-icons/io';
import { RiDeleteBinLine } from 'react-icons/ri';
import Picture from '../shared/Picture';
import { useUploadFile } from 'src/hooks/useApi';
import ButtonLoader from '../shared/ButtonLoader';
const ImageUploader = () => {
	const [photos, setPhotos] = useState<any>([]);
	const [error, setError] = useState<string>();
	const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files;
		if (photos.length < 6) {
			if (!file || file.length === 0) {
				setError('Please chose Image');
				setPhotos([...photos]);
			} else {
				const exist = photos.findIndex(
					(item: any) =>
						item.name.toLowerCase() === file[0].name.toLowerCase(),
				);
				if (exist === -1) {
					setError('');
					setPhotos((oldItem: any) => [...oldItem, file[0]]);
				} else {
					setError('Image already Exist');
					setPhotos([...photos]);
				}
			}
		} else {
			setError('You can upload max 6 image');
		}
	};

	const handleDeleteImage = (name: string) => {
		const exist = photos.filter(
			(item: any) => item.name.toLowerCase() !== name.toLocaleLowerCase(),
		);
		setPhotos(exist);
		setError('');
	};
	const { mutate: uploadFile, isLoading } = useUploadFile();
	const handleUploadImage = () => {
		if (photos.length > 0) {
			let formData = new FormData();
			photos.forEach((image: any) => formData.append('images', image));
			uploadFile({
				url: '/api/file/upload',
				body: formData,
			});
			setPhotos([]);
			setError('');
		}
		setError('Upload image');
	};

	return (
		<>
			<div className="relative image-uploader w-[96%] mx-auto h-[180px] rounded-lg border-2 border-dashed border-[#F7F7F7] hover:bg-[] hover:border-[#AEB5C5] bg-[#EAEDF7] cursor-pointer">
				<input
					type="file"
					name=""
					id=""
					onChange={handleImage}
					className="h-full w-full absolute z-[10] opacity-0 cursor-pointer"
				/>
				<div className="flex flex-col items-center justify-center absolute gap-1 z-[5] w-full h-full">
					<IoMdCloudUpload className="text-[#AEB5C5] text-3xl cursor-pointer" />
					<span className="text-[#141416] text-base">
						Drag image here...
					</span>
				</div>
			</div>
			{error && <span className="text-sm text-red-500">{error}</span>}
			{photos && (
				<div className="preview text-white grid grid-cols-3 gap-2">
					{photos.map((item: any, index: number) => (
						<div
							className="relative group rounded-md overflow-hidden"
							key={index}
						>
							<Picture
								link={URL.createObjectURL(item)}
								classList={'h-20 w-28 rounded-md'}
								alt={''}
							/>
							<div className="preview-overlay bg-[#24282857] w-full h-full absolute top-0 left-0 opacity-100 hidden items-center justify-center group-hover:opacity-1 group-hover:flex">
								<button
									onClick={() => handleDeleteImage(item.name)}
								>
									<RiDeleteBinLine className="text-xl" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="flex w-full items-center justify-center">
				<button
					className="submit__btn w-[96%] h-[45px]"
					onClick={handleUploadImage}
					disabled={isLoading}
				>
					{isLoading ? <ButtonLoader /> : 'Upload Now'}
				</button>
			</div>
		</>
	);
};

export default ImageUploader;
