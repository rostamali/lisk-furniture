import { useForm } from 'react-hook-form';
import Picture from './Picture';

const Footer = () => {
	const { register, handleSubmit } = useForm();
	const handleSubscribeForm = handleSubmit((data) => {});

	return (
		<>
			<footer id="footer" className="bg-white py-24 font-mulish">
				<div className="container mx-auto">
					<div className="grid lg:grid-cols-12 lg:gap-8 grid-cols-12 gap-4">
						{/* first cols */}
						<div className="first-cols lg:col-span-3 md:col-span-6 col-span-12 mb-10 md:mb-0">
							<h4 className="footer-title text-black font-semibold text-lg">
								Address
							</h4>
							<p className="short-subtitle mt-6 lg:pr-4">
								Rajshahi Court - 1201, Rajpara, Rajshahi
								Bangladesh
								<br />
								<a
									href="tel:+8801855393677"
									target="_blank"
									rel="noreferrer"
									className="inline-block my-2"
								>
									+880 1855 393 677
								</a>
								<br />
								<a
									href="mailto:info@getsitedone.com"
									target="_blank"
									rel="noreferrer"
								>
									info@getsitedone.com
								</a>
							</p>
						</div>
						{/* second cols */}
						<div className="second-cols lg:col-span-2 md:col-span-6 col-span-4">
							<h4 className="footer-title text-black font-semibold text-lg">
								About us
							</h4>
							<ul className="mt-6">
								{AboutLink.map((item, index) => (
									<li key={index} className="mb-2">
										<a
											href={item.path}
											className="text-gray-thin text-base font-normal"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						{/* third cols */}
						<div className="second-cols lg:col-span-2 md:col-span-6 col-span-4">
							<h4 className="footer-title text-black font-semibold text-lg">
								Shop by
							</h4>
							<ul className="mt-6">
								{AboutLink.map((item, index) => (
									<li key={index} className="mb-3">
										<a
											href={item.path}
											className="text-gray-thin text-base font-normal"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						{/* fourth cols */}
						<div className="second-cols lg:col-span-2 md:col-span-6 col-span-4">
							<h4 className="footer-title text-black font-semibold text-lg">
								Support
							</h4>
							<ul className="mt-6">
								{AboutLink.map((item, index) => (
									<li key={index} className="mb-3">
										<a
											href={item.path}
											className="text-gray-thin text-base font-normal"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
						{/* fifth cols */}
						<div className="second-cols lg:col-span-3 md:col-span-12 col-span-12 mt-10 md:mt-0">
							<h4 className="footer-title text-black font-semibold text-lg">
								Newsletter
							</h4>
							<form
								onSubmit={handleSubscribeForm}
								className="mt-6"
							>
								<div className="relative">
									<input
										type="email"
										{...register('email')}
										className="block w-full border-0 border-b-2 border-black px-0 focus:border-b-gray-dark placeholder:text-sm placeholder:text-gray-thin"
										placeholder="Enter email"
										required
									/>
									<button
										type="submit"
										className="text-white font-mulish bg-orange-dark absolute right-0 top-2 py-1 px-2 text-sm rounded-md"
									>
										Sign up
									</button>
								</div>
							</form>
							<Picture
								link={'/assets/icons/payment.svg'}
								alt={'Payment icon'}
								classList={'mt-3 w-full '}
							/>
							<p className="text-gray-dark text-sm font-light mt-7">
								Copyright by Md Rostam Ali
							</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

const AboutLink = [
	{
		name: 'Our Story',
		path: '/',
	},
	{
		name: 'Contact us',
		path: '/',
	},
	{
		name: 'Policy',
		path: '/',
	},
	{
		name: 'Carreer',
		path: '/',
	},
];

export default Footer;
