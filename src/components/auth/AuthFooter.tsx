import Link from 'next/link';
type AuthFooterType = {
	text: string;
	link: string;
	linkText: string;
};
const AuthFooter: React.FC<AuthFooterType> = ({ text, link, linkText }) => {
	return (
		<>
			<p className="text-black sm:text-lg text-base text-center text-normal font-mulish pt-6">
				{text} ?
				<Link href={link} className="text-orange-dark ml-2">
					{linkText}
				</Link>
			</p>
		</>
	);
};

export default AuthFooter;
