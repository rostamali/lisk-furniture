import slugify from 'slugify';
import { NextApiRequest, NextApiResponse } from 'next';
const createSlug = (req: NextApiRequest, res: NextApiResponse, next: any) => {
	if (req.body.name) {
		const slug = slugify(req.body.name, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		req.body.slug = slug;
		next();
	}
	if (req.body.title) {
		const slug = slugify(req.body.title, {
			replacement: '-',
			lower: true,
			trim: true,
		});
		req.body.slug = slug;
		next();
	}
};
export default createSlug;
