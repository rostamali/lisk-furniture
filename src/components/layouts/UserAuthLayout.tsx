import { useCreateData, useFetchData } from 'src/hooks/useApi';
import Spinner from '../common/shared/Spinner';
import Login from 'src/pages/login';
import Picture from '../common/shared/Picture';
import { FaList } from 'react-icons/fa';
import { MdDashboardCustomize, MdAccountCircle } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserAuthLayout = ({ children }: any) => {
	const [loading, setLoading] = useState(true);
	const menu = [
		{
			icons: MdDashboardCustomize,
			label: 'Dashboard',
			path: '/user',
		},
		{
			icons: MdAccountCircle,
			label: 'My Account',
			path: '/user/my-account',
		},
		{
			icons: FaList,
			label: 'Orders',
			path: '/user/orders',
		},
	];
	const router = useRouter();
	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	const { mutate: logout } = useCreateData('/api/auth/logout', 'auth');
	const handleLogout = () => {
		logout({});
	};
	useEffect(() => {
		setLoading(false);
	}, [router.pathname]);

	return (
		<>
			{!isLoading ? (
				user.status === 'success' ? (
					user.data.role === 'user' ? (
						<>
							<div
								id="user-layouts"
								className="bg-[#EAEDF7] py-20 h-screen"
							>
								<div className=" mx-auto h-full lg:w-[1450px]">
									<div className="flex gap-8 h-full">
										<div className="bg-white h-full w-[320px] py-10 px-10 rounded-md flex flex-col justify-between">
											<div className="user-menu-profile">
												<div className="flex flex-col gap-4 items-center justify-center">
													<div className="bg-white h-32 w-32 flex items-center justify-center rounded-full border-2 border-orange-dark">
														<Picture
															link={
																user.data
																	? `/uploads/${user.data.thumbnail}`
																	: '/uploads/user.png'
															}
															classList={
																'h-28 w-28 rounded-full'
															}
															alt={
																user.data.name
																	? user.data
																			.name
																	: user.data
																			.userName
															}
														/>
													</div>
													<div className="text-center">
														<h4 className="text-xl font-semibold text-[#A8ADB0] capitalize">
															Hello,
														</h4>
														<h4 className="text-xl font-bold text-[#0E0E23] capitalize">
															{user.data.name
																? user.data.name
																: user.data
																		.userName}
														</h4>
													</div>
												</div>
												<ul className="user-menu mt-10">
													{menu.map((item, index) => (
														<li key={index}>
															<Link
																href={item.path}
																className={`flex items-center gap-4 font-medium text-base capitalize py-3 px-6 rounded-[5px] mb-4 ${
																	router.pathname ===
																	item.path
																		? 'bg-orange-dark text-white btn-shadow'
																		: 'text-black'
																}`}
															>
																<item.icons
																	className={`text-lg  ${
																		router.pathname ===
																		item.path
																			? 'text-[#fff]'
																			: 'text-orange-dark'
																	}`}
																/>
																{item.label}
															</Link>
														</li>
													))}
												</ul>
											</div>
											<div className="flex flex-col gap-4">
												<button
													className="submit__btn"
													onClick={handleLogout}
												>
													Log out
												</button>
												<Link
													href="/"
													className="border-2 border-orange-dark text-black font-medium text-base uppercase py-3 px-6 rounded-[5px] text-center"
												>
													Back to Home
												</Link>
											</div>
										</div>
										<div
											className={`bg-white flex-1 rounded-md
							`}
										>
											<div className="admin-content-wrapper px-14 py-14">
												{!loading ? (
													children
												) : (
													<div className="flex items-center justify-center h-full">
														<Spinner />
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<Login />
					)
				) : (
					<Login />
				)
			) : (
				<div className="flex items-center justify-center h-screen bg-[#EAEDF7]">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default UserAuthLayout;
