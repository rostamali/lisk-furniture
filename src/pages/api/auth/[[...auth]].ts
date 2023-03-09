import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { onError, onNoMatch } from '../../../utils/errorHandler';
import {
	signupUser,
	signinUser,
	authorized,
	getProfile,
	logoutUser,
	updateAdmin,
	userList,
	restictUser,
	updateUser,
	adminDeleteUser,
	deleteUser,
	createUser,
} from 'src/backend/controller/usercontroller';
import dbConnect from '../../../backend/dbConnect';
import { NextApiRequestExtended } from 'src/types';
const router = createRouter<NextApiRequestExtended, NextApiResponse>();

router
	.use(expressWrapper(cors()))
	.use(async (req, res, next) => {
		await dbConnect();
		await next();
	})
	.get('/api/auth/profile', authorized, getProfile)
	.get('/api/auth/users', authorized, restictUser('admin'), userList)
	.get('/api/auth/info', authorized, getProfile)
	.post('/api/auth/createuser', authorized, restictUser('admin'), createUser)
	.post('/api/auth/logout', authorized, logoutUser)
	.post('/api/auth/signup', signupUser)
	.post('/api/auth/signin', signinUser)
	.put(
		'/api/auth/update/admin',
		authorized,
		restictUser('admin'),
		updateAdmin,
	)
	.put('/api/auth/update/user', authorized, restictUser('user'), updateUser)
	.delete(
		'/api/auth/user/delete',
		authorized,
		restictUser('user'),
		deleteUser,
	)
	.delete(
		'/api/auth/deleteuser/:id',
		authorized,
		restictUser('admin'),
		adminDeleteUser,
	);

export default router.handler({
	onError,
	onNoMatch,
});
