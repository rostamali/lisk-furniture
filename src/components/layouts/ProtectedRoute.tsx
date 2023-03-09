import { useFetchData } from 'src/hooks/useApi';
import Spinner from '../common/shared/Spinner';
import Login from 'src/pages/login';
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('../common/shared/Footer'), {
	ssr: false,
});
const Header = dynamic(() => import('../common/shared/Header'), {
	ssr: false,
});

const ProtectedRouted = ({ children }: any) => {
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	return (
		<>
			{isLoading ? (
				<div className="flex items-center justify-center h-[450px]">
					<Spinner />
				</div>
			) : user.status === 'success' ? (
				<>
					<Header
						login={
							isLoading
								? false
								: user.status === 'success'
								? true
								: false
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
					<div className="main-content">{children}</div>
					<Footer />
				</>
			) : (
				<Login />
			)}
		</>
	);
};

export default ProtectedRouted;
