import Picture from 'src/components/common/shared/Picture';
import DefaultLayout from 'src/components/layouts/DefaultLayout';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

const ThankYou = ({ OrderSlug }: { OrderSlug: string }) => {
	return (
		<>
			<Head>
				<title>Thank you for your order</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div id="thank-you" className="py-24 border-b-2 border-gray-light">
				<div className="container mx-auto font-mulish text-center">
					<div className="flex items-center justify-center">
						<Picture
							link={'/assets/icons/checkmark.svg'}
							alt={'Check mark'}
							classList={'h-16 w-16'}
						/>
					</div>
					<h2 className="text-black md:text-4xl text-xl font-black my-8">
						Thank you for your order !
					</h2>
					<p className="short-subtitle">
						Your order is complete. Please check your email for the
						details.
						<br />
						Your order number is -{' '}
						<span className="font-bold">{OrderSlug}</span>
					</p>
					<Link
						href="/shop"
						className="inline-block bg-orange-dark text-white uppercase text-base px-6 py-3 mt-8"
					>
						Countinue shopping now
					</Link>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const { OrderSlug } = context.query;
	return {
		props: { OrderSlug },
	};
}
ThankYou.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
export default ThankYou;
