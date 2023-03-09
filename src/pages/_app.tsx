import { useEffect, useState } from 'react';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { saveState } from 'src/redux/localStorage';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	useEffect(() => {
		store.subscribe(() => {
			saveState({
				cart: store.getState().cart,
				shippingForm: store.getState().shippingForm,
				wishlist: store.getState().wishlist,
			});
		});
	}, []);

	const getLayout = Component.getLayout || ((page) => page);
	const [queryClient] = useState(() => new QueryClient());
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					{getLayout(
						<>
							<Head>
								<meta
									property="og:image:type"
									content="image/png"
								/>

								<meta
									property="twitter:card"
									content="summary_large_image"
								/>
							</Head>
							<Component {...pageProps} />
							<ToastContainer
								position="bottom-center"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								theme="colored"
							/>
						</>,
					)}
				</Provider>
			</QueryClientProvider>
		</>
	);
}
