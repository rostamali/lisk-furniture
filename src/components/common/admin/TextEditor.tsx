import dynamic from 'next/dynamic';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
const Editor = dynamic(
	() => import('react-draft-wysiwyg').then((module) => module.Editor),
	{
		ssr: false,
	},
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type DraftType = {
	defaultVal: any;
	handler: any;
};

const TextEditor: React.FC<DraftType> = ({ handler, defaultVal }) => {
	const [editorState, setEditorState] = useState(
		defaultVal ? defaultVal : EditorState.createEmpty(),
	);

	const onEditorStateChange = (event: any) => {
		setEditorState(event);
		handler(draftToHtml(convertToRaw(event.getCurrentContent())));
	};
	return (
		<>
			<Editor
				editorState={editorState}
				toolbarClassName="rich-text-editor__toolbar border !border-[#cbcdd5]"
				wrapperClassName="wrapperClassName w-full"
				editorClassName="rich-text-editor border border-[#cbcdd5] px-4 text-[#0E0E23] !h-[400px]"
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					options: [
						'inline',
						'blockType',
						'fontSize',
						'fontFamily',
						'list',
						'textAlign',
						'link',
						'embedded',
						'image',
						'colorPicker',
						'remove',
						'emoji',
						'history',
					],
					inline: {
						inDropdown: true,
					},
					fontFamily: {
						options: ['mulish', 'poppins', 'workSans'],
					},
					textAlign: { inDropdown: true },
					blockType: {
						inDropdown: true,
						options: [
							'Normal',
							'H1',
							'H2',
							'H3',
							'H4',
							'Blockquote',
							'Code',
						],
					},
				}}
			/>
		</>
	);
};

export default TextEditor;
