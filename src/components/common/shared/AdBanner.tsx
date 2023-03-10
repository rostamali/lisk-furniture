import Picture from './Picture';

const AdBanner = () => {
	const array = [1, 2];
	return (
		<>
			<div id="home-ad-banner" className="bg-gray-light pb-24">
				<div className="container mx-auto">
					<div className="grid md:grid-cols-2 lg:gap-8 gap-4">
						{array.map((item, index) => (
							<div
								className="small-ad-banner bg-white font-mulish relative"
								key={index}
							>
								<div className="flex items-center sm:flex-row flex-col lg:py-8 py-5 lg:px-8 px-5">
									<div className="flex-1 w-full">
										<div className="absolute bg-orange-dark h-12 w-12 rounded-full flex items-center justify-center text-white text-base font-semibold top-1 left-1 z-10">
											-50%
										</div>
										<div>
											<Picture
												link={`/assets/ad-banner-1.png`}
												alt={'Feature product'}
												classList={'md:w-[80%] w-[60%]'}
											/>
										</div>
									</div>
									<div className="ad-info flex-1">
										<span className="text-orange-dark text-xs font-medium">
											BIG SALE COUNTDOWN
										</span>
										<h2 className="text-black font-extrabold lg:text-3xl text-xl my-2">
											Chair Collection
										</h2>
										<p className="short-subtitle">
											Shop for your living room. Up to 75%
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdBanner;
