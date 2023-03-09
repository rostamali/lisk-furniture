import { NextApiResponse } from 'next';
import File from '../models/filemodel';
const multer = require('multer');
import path from 'path';
import fs from 'fs';
import { NextApiRequestExtended } from 'src/types';
import CatchAsync from 'src/utils/catchAsync';
const Jimp = require('jimp');
export const config = {
	api: {
		bodyParser: false,
	},
};
const multerStorage = multer.memoryStorage();
const multerFilter = (
	req: NextApiRequestExtended,
	file: { mimetype: string },
	cb: (arg0: string | null, arg1: boolean) => void,
) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb('Upload Failed', false);
	}
};
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

// ================ Admin Uploads Photo

export const uploadImages = upload.array('images');
export const resizeUserPhoto = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const images = req.files;
		if (images.length === 0) throw new Error('Provide valid images');
		req.body.images = [];
		for (const image of images) {
			const selectedImage = await Jimp.read(image.buffer);
			selectedImage.resize(500, Jimp.AUTO);
			const fileName = `${Date.now()}.${image.mimetype.split('/')[1]}`;
			await selectedImage.write(`./public/uploads/${fileName}`);
			req.body.images.push({ name: fileName });
		}
		next();
	},
);
export const setImageInDb = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const images = req.body.images;
		if (images.length === 0) throw new Error('Oops try again');
		await File.insertMany(images);
		res.status(200).json({
			status: 'success',
			message: `Successfully upload file${images.length > 1 ? 's' : ''}`,
		});
	},
);
export const getImages = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { page = 1, limit = 5 } = req.query;
		const skip =
			(parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);

		const files = await File.find({})
			.sort({ createdAt: -1 })
			.select('-__v -createdAt -updatedAt')
			.skip(skip)
			.limit(parseInt(limit as string, 10))
			.exec();
		const totalPost = await File.countDocuments({});
		res.status(200).json({
			status: 'success',
			pages: Math.ceil(totalPost / parseInt(limit as string, 10)),
			currentPage: parseInt(page as string, 10),
			data: files,
		});
	},
);
export const deleteImage = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse) => {
		const { name } = req.params;
		const directoryPath = path.join('./public/uploads/');
		fs.unlinkSync(directoryPath + name);
		const deleteFile = await File.findOneAndDelete({
			name,
		});
		if (!deleteFile) throw new Error('Please try again');
		res.status(200).send({
			message: 'File is deleted',
		});
	},
);

// ================ User Uploads Photo
export const userUploadImages = upload.array('thumbnail');
export const resizeUserThumbanil = CatchAsync(
	async (req: NextApiRequestExtended, res: NextApiResponse, next: any) => {
		const images = req.files;
		if (images.length === 0) throw new Error('Provide valid images');
		req.body.thumbnail = [];
		for (const image of images) {
			const selectedImage = await Jimp.read(image.buffer);
			selectedImage.resize(500, Jimp.AUTO);
			const fileName = `${req.user._id}-${Date.now()}.${
				image.mimetype.split('/')[1]
			}`;
			await selectedImage.write(`./public/uploads/${fileName}`);
			req.body.thumbnail.push(fileName);
		}
		next();
	},
);
