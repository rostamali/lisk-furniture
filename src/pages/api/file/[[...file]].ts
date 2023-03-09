import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import {
	deleteImage,
	getImages,
	resizeUserPhoto,
	resizeUserThumbanil,
	setImageInDb,
	uploadImages,
	userUploadImages,
} from 'src/backend/controller/filecontroller';
import {
	authorized,
	restictUser,
	updateUser,
} from 'src/backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

export const config = {
	api: {
		bodyParser: false,
	},
};

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/file/images', getImages)
	.post(
		'/api/file/upload',
		authorized,
		restictUser('admin'),
		uploadImages,
		resizeUserPhoto,
		setImageInDb,
	)
	.put(
		'/api/file/update/user',
		authorized,
		restictUser('user'),
		userUploadImages,
		resizeUserThumbanil,
		updateUser,
	)
	.delete(
		'/api/file/delete/:name',
		authorized,
		restictUser('admin'),
		deleteImage,
	);

export default router.handler({
	onError,
	onNoMatch,
});
