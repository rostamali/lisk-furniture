import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import { useRef } from 'react';
import Picture from './Picture';
import { CartProductType } from 'src/types';

const ProductSlider = ({ products }: { products: CartProductType[] }) => {
	const settings = {
		infinite: true,
		centerPadding: '10px',
		slidesToShow: 4,
		speed: 500,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};
	const sliderRef = useRef<Slider>(null);

	return (
		<>
			<div className="product-slider">
				<div className="container mx-auto relative">
					<button
						className={`slider-btn slider__btn-shadow mr-3 absolute top-[60%] -left-4 hidden sm:block`}
						onClick={() => sliderRef.current?.slickPrev()}
					>
						<Picture
							link={`/assets/icons/left-arrow.svg`}
							alt={'Left Arrow'}
							classList={'h-5 w-5'}
						/>
					</button>
					<Slider {...settings} ref={sliderRef}>
						{products.length > 0 &&
							products.map(
								(product: CartProductType, index: number) => (
									<div key={index} className="slider-box">
										<ProductCard template={product} />
									</div>
								),
							)}
					</Slider>
					<button
						className={`slider-btn slider__btn-shadow absolute top-[60%] -right-4 hidden sm:block`}
						onClick={() => sliderRef.current?.slickNext()}
					>
						<Picture
							link={`/assets/icons/right-arrow.svg`}
							alt={'Left Arrow'}
							classList={'h-5 w-5'}
						/>
					</button>
					<div className="flex">
						<button
							className={`slider-btn slider__btn-shadow mr-3 block absolute top-[60%] -left-4 hidden sm:block`}
							onClick={() => sliderRef.current?.slickPrev()}
						>
							<Picture
								link={`/assets/icons/left-arrow.svg`}
								alt={'Left Arrow'}
								classList={'h-5 w-5'}
							/>
						</button>
						<button
							className={`slider-btn slider__btn-shadow absolute top-[60%] -right-4 hidden sm:block`}
							onClick={() => sliderRef.current?.slickNext()}
						>
							<Picture
								link={`/assets/icons/right-arrow.svg`}
								alt={'Left Arrow'}
								classList={'h-5 w-5'}
							/>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductSlider;
