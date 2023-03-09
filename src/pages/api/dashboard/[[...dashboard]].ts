import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
import {
	getAdminDashboard,
	getUserDashboard,
} from 'src/backend/controller/dashboardcontroller';
import {
	authorized,
	restictUser,
} from '../../../backend/controller/usercontroller';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get(
		'/api/dashboard/admin',
		authorized,
		restictUser('admin'),
		getAdminDashboard,
	)
	.get(
		'/api/dashboard/user',
		authorized,
		restictUser('user'),
		getUserDashboard,
	);

export default router.handler({
	onError,
	onNoMatch,
});
