import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type TagFieldType = {
	defaultVal: string[];
	handler: any;
};

const TagField: React.FC<TagFieldType> = ({ defaultVal, handler }) => {
	const [tags, setTags] = useState<string[]>([]);
	const removeTags = (indexToRemove: number) => {
		setTags([...tags.filter((item, index) => index !== indexToRemove)]);
		handler([...tags.filter((item, index) => index !== indexToRemove)]);
	};
	const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		if (value !== '') {
			setTags([...tags, value]);
			handler([...tags, value]);
			(event.target as HTMLInputElement).value = '';
		}
	};
	return (
		<>
			<div className="tags-input flex items-center flex-wrap min-h-[48px] w-full px-[8px] border border-[#d6d8da] bg-white focus-within:border-orange-dark">
				<ul id="tags" className="flex flex-wrap">
					{tags.map((tag, index) => (
						<li
							key={index}
							className="tag w-auto h-[32px] flex items-center justify-center gap-[6px] text-[#fff] list-none rounded-md px-2 ml-[8px] bg-orange-dark"
						>
							<span className="tag-title">{tag}</span>
							<button
								className="tag-close-icon"
								onClick={() => removeTags(index)}
							>
								<FaTimes className="text-[14px]" />
							</button>
						</li>
					))}
				</ul>
				<input
					className="flex-1 border-0 h-[46px] text-base ring-0 focus:border-0 focus:ring-0"
					type="text"
					onKeyUp={(event) =>
						event.key === 'Enter' ? addTags(event) : null
					}
					placeholder="Press enter to add tags"
				/>
			</div>
		</>
	);
};

export default TagField;
