import StarRatings from 'react-star-ratings';

const Ratings = ({ rating, size }: { rating: number; size: string }) => {
	return (
		<>
			<StarRatings
				rating={rating}
				starRatedColor="#FAAD3D"
				starDimension={size ? size : '13px'}
				starSpacing="0px"
			/>
		</>
	);
};

export default Ratings;
