import { useFetchData } from 'src/hooks/useApi';
import dynamic from 'next/dynamic';
import Spinner from '../common/shared/Spinner';
const Footer = dynamic(() => import('../common/shared/Footer'), {
	ssr: false,
});
const Header = dynamic(() => import('../common/shared/Header'), {
	ssr: false,
});

const DefaultLayout = ({ children }: any) => {
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	return (
		<>
			<Header
				login={
					isLoading ? false : user.status === 'success' ? true : false
				}
				name={
					isLoading
						? 'My Account'
						: user.status === 'success'
						? user.data.name
							? user.data.name
							: user.data.userName
						: 'My Account'
				}
				role={
					isLoading
						? 'user'
						: user.status === 'success'
						? user.data.role
						: 'user'
				}
			/>
			<div className="main-content">
				{isLoading ? (
					<div className="flex items-center justify-center h-[450px]">
						<Spinner />
					</div>
				) : (
					children
				)}
			</div>
			<Footer />
		</>
	);
};

export default DefaultLayout;
