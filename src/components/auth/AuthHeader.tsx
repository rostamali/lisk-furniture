import { FcGoogle } from 'react-icons/fc';
import { MdFacebook } from 'react-icons/md';
import Link from 'next/link';
import Picture from '../common/shared/Picture';

const AuthHeader = ({ title }: { title: string }) => {
	return (
		<>
			<div className="form-header">
				<h3 className="font-mulish md:text-3xl text-center sm:text-2xl text-lg font-extrabold pb-12">
					{title}
				</h3>
			</div>
			{/* <div className="social-login grid grid-cols-2 sm:gap-4 gap-2 mb-10">
				<button className="border-2 border-gray-light rounded flex items-center justify-center py-3 px-2 ">
					<FcGoogle className="text-xl sm:mr-4 mr-1" />
					<span className="sm:text-base text-xs font-mulish font-semibold text-black">
						Login with Google
					</span>
				</button>
				<button className="border-2 border-gray-light rounded flex items-center justify-center py-3 px-2">
					<MdFacebook
						className="text-xl sm:mr-4 mr-1"
						fill="#193FF6"
					/>
					<span className="sm:text-base text-xs font-mulish font-semibold text-black">
						Login with Facebook
					</span>
				</button>
			</div> */}
		</>
	);
};

export default AuthHeader;
