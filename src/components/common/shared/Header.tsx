import { RootState } from 'src/redux/store';
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { useState } from 'react';
import { useRouter } from 'next/router';

type HeaderType = {
	login: boolean;
	name: string;
	role: string;
};

const Header: React.FC<HeaderType> = ({ login, name, role }) => {
	const { totalQuantity: cartQty, cartSubTotal } = useSelector(
		(state: RootState) => state.cart,
	);
	const { totalQuantity, wishlistSubTotal } = useSelector(
		(state: RootState) => state.wishlist,
	);
	const MidHeader = [
		{
			name: `${login ? name : 'My Account'}`,
			icon: HiOutlineUser,
			link: `${role === 'admin' ? '/admin' : '/user/'}`,
		},
		{
			name: `Wishlist: $${
				wishlistSubTotal ? wishlistSubTotal.toFixed(2) : '0.00'
			}`,
			icon: FaRegHeart,
			link: '/wishlist',
		},
		{
			name: `Your Cart: $${
				cartSubTotal ? cartSubTotal.toFixed(2) : '0.00'
			}`,
			icon: FiShoppingBag,
			link: '/cart',
		},
	];
	const MobileMidHeader = [
		{
			name: `${login ? name : 'My Account'}`,
			icon: HiOutlineUser,
			link: `${role === 'admin' ? '/admin' : '/user/'}`,
		},
		{
			name: `${totalQuantity ? totalQuantity : '0'}`,
			icon: FaRegHeart,
			link: '/wishlist',
		},
		{
			name: `${cartQty ? cartQty : '0'}`,
			icon: FiShoppingBag,
			link: '/cart',
		},
	];

	const MainNavigation = [
		{
			name: 'Home',
			path: '/',
			class: '-ml-3',
		},
		{
			name: 'Shop',
			path: '/shop',
			class: '',
		},
		{
			name: 'Wishlist',
			path: '/wishlist',
			class: '',
		},
		{
			name: 'Cart',
			path: '/cart',
			class: '',
		},
		{
			name: 'Checkout',
			path: '/checkout',
			class: '',
		},
	];

	const router = useRouter();
	const [show, setShow] = useState(false);

	return (
		<>
			<header id="header" className="relative">
				{/* Header Top */}
				<div className="header-top bg-orange-dark">
					<div className="container mx-auto h-12 flex items-center sm:justify-start justify-center">
						<p className="font-mulish text-white font-normal sm:text-sm text-xs sm:text-left text-center tracking-wider">
							Sale up to 50% on this sunday.Shop now!
						</p>
					</div>
				</div>
				{/* Mid Header */}
				<div className="mid-header lg:py-6 py-4">
					<div className="container mx-auto">
						<div className="grid grid-cols-2">
							<div className="mid-header-logo flex items-center">
								<Link href="/">
									<Logo color={'#000'} />
								</Link>
							</div>
							<div className="mid-header__menu items-center justify-end md:flex hidden">
								{MidHeader.map((item, index) => (
									<div
										className="mid-header__menu-item flex items-center ml-6"
										key={index}
									>
										<div className="icon box-shadow h-12 w-12 rounded-full flex items-center justify-center">
											<item.icon className="text-black text-2xl" />
										</div>
										<a href={item.link}>
											<span className="font-mulish font-medium capitalize text-black text-sm inline-block ml-4">
												{item.name}
											</span>
										</a>
									</div>
								))}
							</div>
							<div className="items-center justify-end md:hidden flex">
								<button
									onClick={() => setShow(!show)}
									className={`${
										show ? 'active-menu' : ''
									} flex items-center justify-center`}
								>
									<span className="toggle-bar sm:w-[25px] w-[22px]"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Main Navigation */}
				<div className="main-navigation md:block hidden">
					<div className="container mx-auto">
						<nav className="py-4">
							<ul className="flex font-mulish">
								{MainNavigation.map((item, index) => (
									<li key={index}>
										<Link
											href={item.path}
											className={`text-black text-base font-semibold py-2 px-3 mr-4 ${
												item.class ? item.class : ''
											}`}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
				{/* Mobile Navigation */}
				<div
					className={`mobile-menu md:hidden block duration-150 origin-top absolute w-full py-2 top-[100%] ${
						show ? 'scale-y-[1] bg-[#fff] z-[120]' : 'scale-y-[0]'
					}`}
				>
					<div className="container mx-auto">
						<div className="menu-link gap-4 flex flex-col">
							{MainNavigation.map((item, index) => (
								<Link
									href={item.path}
									className={`block duration-300 font-medium ${
										router.pathname === item.path
											? 'text-orange-dark'
											: 'text-[#000] hover:text-orange-dark]'
									}`}
									key={index}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</header>
			<div className="fixed bottom-0 bg-gray-light z-[199] w-full md:hidden flex items-center justify-evenly py-[5px] ">
				{MobileMidHeader.map((item, index) => (
					<Link href={item.link} key={index} className="block">
						<div className="mid-header__menu-item flex items-center">
							<div className="icon box-shadow h-12 w-12 rounded-full flex items-center justify-center relative">
								<item.icon className="text-black text-2xl" />
								{index !== 0 && (
									<span className="absolute bg-orange-dark h-[20px] w-[20px] rounded-full flex items-center justify-center text-sm text-white top-0 -right-1">
										{item.name}
									</span>
								)}
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default Header;
