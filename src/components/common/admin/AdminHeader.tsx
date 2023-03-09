import { IoNotifications } from 'react-icons/io5';
import { HiOutlineMenuAlt1, HiOutlineMoon } from 'react-icons/hi';
import { Dropdown } from 'flowbite-react';
import Link from 'next/link';
import Picture from '../shared/Picture';
import { useCreateData, useFetchData } from 'src/hooks/useApi';

const AdminHeader = ({
	handler,
	value,
}: {
	handler: (value: boolean) => void;
	value: boolean;
}) => {
	const { mutate: logout } = useCreateData('/api/auth/logout', 'auth');
	const handleLogout = () => {
		logout({});
	};

	const { data: user, isLoading } = useFetchData(
		'/api/auth/profile',
		'auth',
		1,
	);

	return (
		<>
			<div
				id="admin-header"
				className={`bg-white flex items-center justify-between py-3 pr-14 pl-5 fixed w-full z-[9]`}
				style={{
					boxShadow:
						' -7.829px 11.607px 20px 0 hsl(244deg 8% 59% / 9%)',
				}}
			>
				<div
					className={`admin-navbar-toggler ${
						value ? 'pl-[100px]' : 'pl-[240px]'
					}`}
				>
					<button onClick={() => handler(!value)}>
						<HiOutlineMenuAlt1 className="text-2xl" />
					</button>
				</div>
				<div className="admin-menu flex gap-4 items-center relative">
					<button className="h-8 w-8 border-2 bg-[#F0F1FF] border-[#F0F1FF] rounded-full flex items-center justify-center">
						<HiOutlineMoon className="text-xl" />
					</button>
					<Dropdown
						label={
							<div className="relative h-8 w-8 border-2 bg-[#F0F1FF] border-[#F0F1FF] rounded-full flex items-center justify-center">
								<IoNotifications className="text-xl" />
								<span className="bg-orange-dark h-[16px] w-[16px] rounded-full flex items-center justify-center absolute text-[#fff] text-[10px] -right-1 -top-1">
									5
								</span>
							</div>
						}
						inline={true}
						arrowIcon={false}
						className="relative"
					>
						<div className="absolute -right-8 bg-white">
							<Dropdown.Item>Dashboard</Dropdown.Item>
							<Dropdown.Item>Settings</Dropdown.Item>
							<Dropdown.Item>Earnings</Dropdown.Item>
							<Dropdown.Item>Sign out</Dropdown.Item>
						</div>
					</Dropdown>
					{!isLoading && (
						<Dropdown
							label={
								<Picture
									link={
										user.data.thumbnail
											? `/uploads/${user.data.thumbnail}`
											: '/uploads/user.png'
									}
									classList={
										'h-8 w-8 border-2 border-[#6259CA] rounded-full'
									}
									alt={'User'}
								/>
							}
							inline={true}
							arrowIcon={false}
							className="relative header-dropdown-parent"
						>
							<Dropdown.Item className="absolute -right-8 bg-white header-dropdown">
								<div className="bg-white w-[240px] py-4 px-3">
									{user.status === 'success' ? (
										<>
											<div className="flex items-center gap-4">
												<Picture
													link={
														user.data.thumbnail
															? `/uploads/${user.data.thumbnail}`
															: '/uploads/user.png'
													}
													classList={
														'h-12 w-12 border-2 border-[#6259CA] rounded-full'
													}
													alt={'User'}
												/>
												<div>
													<h5 className="text-base font-semibold text-[#0E0E23] capitalize">
														{user.data.userName}
													</h5>
													<span className="text-[#6259CA] text-sm font-semibold capitalize">
														{user.data.role}
													</span>
												</div>
											</div>
											<h4 className="menu-lavel text-[#140d0d] uppercase text-sm font-semibold pt-3 pb-3">
												usefull links
											</h4>
											<ul>
												<li>
													<Link
														className="text-sx text-[#6259CA] block py-1"
														href="/admin/account-setting"
													>
														My Profile
													</Link>
												</li>
												<li>
													<button
														className="text-sx text-[#fff] block py-2 w-full bg-orange-dark mt-2"
														onClick={handleLogout}
													>
														Sign Out
													</button>
												</li>
											</ul>
										</>
									) : (
										<div className="flex flex-col items-center">
											<Picture
												link={'/uploads/user.png'}
												classList={
													'h-12 w-12 border-2 border-[#6259CA] rounded-full'
												}
												alt={'User'}
											/>
											<button
												className="text-sx text-[#fff] block py-2 w-full bg-orange-dark mt-2"
												onClick={handleLogout}
											>
												Sign In
											</button>
										</div>
									)}
								</div>
							</Dropdown.Item>
						</Dropdown>
					)}
				</div>
			</div>
		</>
	);
};

export default AdminHeader;
