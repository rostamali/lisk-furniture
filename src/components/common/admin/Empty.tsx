import { MdOutlineHourglassEmpty } from 'react-icons/md';
const Empty = ({ text }: { text: string }) => {
	return (
		<>
			<div className="flex flex-col items-start gap-4 mt-8">
				<div className="bg-orange-dark h-14 w-14 rounded-full flex items-center justify-center">
					<MdOutlineHourglassEmpty className="text-3xl text-[#fff] animate-spin" />
				</div>
				<h4 className="text-2xl font-semibold text-center capitalize">
					{text}...
				</h4>
			</div>
		</>
	);
};

export default Empty;
