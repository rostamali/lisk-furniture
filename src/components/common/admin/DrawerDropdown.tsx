import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { FiPackage } from 'react-icons/fi';
import { useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { BiCategory, BiStore } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdReviews } from 'react-icons/md';

const DrawerDropdown = ({ navOpen }: { navOpen: boolean }) => {
	const [dropdown, setDropdown] = useState(false);
	const menu = [
		{
			icons: FiPackage,
			label: 'New Product',
			path: '/admin/product/new-product',
		},
		{
			icons: FiPackage,
			label: 'All Products',
			path: '/admin/product',
		},
		{
			icons: BiCategory,
			label: 'Category',
			path: '/admin/product/category',
		},
		{
			icons: MdReviews,
			label: 'Reviews',
			path: '/admin/product/reviews',
		},
		{
			icons: AiOutlineShopping,
			label: 'Orders',
			path: '/admin/orders',
		},
	];

	const router = useRouter();

	return (
		<>
			<button
				className={`text-[#ffffff4d] flex items-center w-full gap-2 pl-[6px] group ${
					navOpen ? 'flex-wrap gap-0' : ''
				}`}
				onClick={() => setDropdown(!dropdown)}
			>
				<div className="h-8 w-8 flex items-center justify-center group-hover:text-[#ffffff]">
					<BiStore className="text-lg text-[#ffffff4d" />
				</div>
				<div
					className={`flex items-center justify-between flex-1 z-[12]`}
				>
					<span
						className={`text-sm font-semibold group-hover:text-[#ffffff] ${
							navOpen ? 'scale-0 hidden' : 'scale-100'
						}`}
					>
						Ecommerce
					</span>
					{dropdown ? (
						<BsChevronDown className="duration-300 mr-4 relative z-[12] group-hover:text-[#ffffff]" />
					) : (
						<BsChevronRight className="duration-300 mr-4 relative z-[12] group-hover:text-[#ffffff]" />
					)}
				</div>
			</button>
			<ul
				className={`duration-300 ${
					dropdown ? 'h-auto' : 'h-0 overflow-hidden'
				}`}
			>
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
										router.pathname === item.path
											? 'text-[#ffffff]'
											: 'text-[#ffffff4d] group-hover:text-white'
									}`}
								/>
							</span>
							<span
								className={`${
									navOpen ? 'scale-0' : 'scale-100'
								} origin-left${
									router.pathname === item.path
										? '!text-[#ffffff4d]'
										: 'text-[#ffffff4d]'
								}`}
							>
								{item.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default DrawerDropdown;
