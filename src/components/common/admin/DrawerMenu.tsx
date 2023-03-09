import { AiFillAppstore, AiOutlineHome } from 'react-icons/ai';
import { FaRegImages, FaUserFriends } from 'react-icons/fa';
import { useRouter } from 'next/router';
import DrawerDropdown from './DrawerDropdown';
import Picture from '../shared/Picture';
import Link from 'next/link';
import Logo from '../shared/Logo';

const DrawerMenu = ({ navOpen }: { navOpen: boolean }) => {
	const menu = [
		{
			icons: AiOutlineHome,
			label: 'Dashboard',
			path: '/admin',
		},
		{
			icons: FaRegImages,
			label: 'Gallery',
			path: '/admin/gallery',
		},
		{
			icons: AiFillAppstore,
			label: 'Account Settings',
			path: '/admin/account-setting',
		},
		{
			icons: FaUserFriends,
			label: 'Users',
			path: '/admin/users',
		},
	];

	const router = useRouter();

	return (
		<>
			<div className="drawer-menu sidebar fixed top-0 bottom-0 left-0 z-[10]">
				<div
					className={`drawer-menu-wrapper h-screen duration-300 ${
						navOpen ? 'w-[100px] pt-[10px]' : 'w-[240px]'
					} bg-[#0E0E23] pb-[40px] pt-[20px]`}
				>
					<div className="pl-[30px]">
						<Link href="/">
							<Logo color="#FFF" />
						</Link>
					</div>
					<div className="menu pl-[30px] pt-10">
						{!navOpen && (
							<h4 className="menu-lavel text-[#ffffff4d] uppercase text-sm font-semibold pb-3">
								Dashboard
							</h4>
						)}
						<ul>
							{menu.map((item, index) => (
								<li key={index} className="my-2">
									<Link
										href={item.path}
										className={`h-[44px] text-sm font-semibold flex items-center gap-2 py-[5px] pl-[6px] rounded-l-[30px] relative group main-link ${
											router.pathname === item.path
												? 'active bg-[#EAEDF7]'
												: 'text-[#d2cccc78] hover:text-white'
										} ${navOpen && 'flex-wrap'}`}
									>
										{router.pathname === item.path && (
											<>
												<span className="shape-1 h-[60px] bg-[#EAEDF7] absolute w-[20px] -top-[30px] right-0"></span>
												<span className="shape-2 h-[30px] bg-[#EAEDF7] absolute w-[20px] right-0 top-[35px]"></span>
											</>
										)}
										<span
											className={`h-8 w-8 rounded-full flex items-center justify-center ${
												router.pathname === item.path
													? 'bg-orange-dark'
													: ''
											}`}
										>
											<item.icons
												className={`text-lg  ${
													router.pathname ===
													item.path
														? 'text-[#ffffff]'
														: 'text-[#ffffff4d] group-hover:text-white'
												}`}
											/>
										</span>
										<span
											className={`${
												navOpen && 'scale-0'
											} origin-left`}
										>
											{item.label}
										</span>
									</Link>
								</li>
							))}
							<li>
								<DrawerDropdown navOpen={navOpen} />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default DrawerMenu;
