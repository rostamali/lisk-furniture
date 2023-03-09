import { useState } from 'react';
import Slider from 'react-slick';
import Picture from './Picture';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductGallery = ({ images }: { images: string[] }) => {
	const [nav1, setNav1] = useState<any>();
	const [nav2, setNav2] = useState<any>();

	return (
		<>
			{images && (
				<div className="-mr-2 ">
					<Slider
						className="mainSlider"
						asNavFor={nav2}
						ref={(slider1) => setNav1(slider1)}
					>
						{images.map((item, index) => (
							<div key={index} className="thumbs-button">
								<div className="thumbs-inner">
									<Picture
										link={`/uploads/${item}`}
										alt="Product Thumbnail"
										classList={
											'h-[400px] w-[100%] lg:w-[100%] border'
										}
									/>
								</div>
							</div>
						))}
					</Slider>
					<Slider
						asNavFor={nav1}
						ref={(slider2) => setNav2(slider2)}
						slidesToShow={images.length < 3 ? images.length : 3}
						swipeToSlide={true}
						focusOnSelect={true}
						className="product-gallery-button"
					>
						{images.map((item, index) => (
							<div key={index} className="thumbs-button">
								<div className="thumbs-inner">
									<Picture
										link={`/uploads/${item}`}
										alt="Product Thumbnail"
										classList={
											'h-[90px] w-[100%] sm:h-[120px] sm:w-[80%] md:[h-120px] md:w-[100%] lg:h-[190px] lg:w-[100%] border thumbs-border'
										}
									/>
								</div>
							</div>
						))}
					</Slider>
				</div>
			)}
		</>
	);
};

export default ProductGallery;
