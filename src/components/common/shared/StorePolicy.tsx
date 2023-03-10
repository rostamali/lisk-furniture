import Picture from './Picture';

const StorePolicy = () => {
	return (
		<>
			<div id="store-policy" className="bg-gray-light pb-24 font-mulish">
				<div className="container mx-auto">
					<div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-[28px] gap-4">
						{StoreFeature.map((item, index) => (
							<div
								className="feature-item bg-white flex py-6 px-6 gap-4"
								key={index}
							>
								<Picture
									link={item.icon}
									alt={item.title}
									classList={'sm:w-[60px] w-[80px] h-auto'}
								/>

								<div className="">
									<h4 className="text-black text-lg font-bold mb-2">
										{item.title}
									</h4>
									<p className="short-subtitle">
										{item.excerpt}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
const StoreFeature = [
	{
		icon: `/assets/icons/cookie.svg`,
		title: `Unique Everything`,
		excerpt: `We have millions of one-of-a-kind items in our shop`,
	},
	{
		icon: `/assets/icons/truck.svg`,
		title: `Unique Everything`,
		excerpt: `We have millions of one-of-a-kind items in our shop`,
	},
	{
		icon: `/assets/icons/secure.svg`,
		title: `Unique Everything`,
		excerpt: `We have millions of one-of-a-kind items in our shop`,
	},
	{
		icon: `/assets/icons/support.svg`,
		title: `Unique Everything`,
		excerpt: `We have millions of one-of-a-kind items in our shop`,
	},
];
export default StorePolicy;
