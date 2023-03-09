import Image from 'next/image';

type PictureType = {
	link: string;
	classList: string;
	alt: string;
};

const Picture: React.FC<PictureType> = ({ link, classList, alt }) => {
	return (
		<>
			<div
				className={`relative overflow-hidden ${
					classList ? classList : ''
				}`}
			>
				<picture>
					<source srcSet={link} type="image/avif" />
					<source srcSet={link} type="image/webp" />
					<img
						src={link}
						alt={alt}
						className={`object-cover w-full h-full ${
							classList ? classList : ''
						}`}
					/>
				</picture>
			</div>
		</>
	);
};

export default Picture;
