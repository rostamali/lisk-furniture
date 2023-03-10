import { NextApiResponse } from 'next';
import { NextApiRequestExtended } from 'src/types';
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	server.use('/uploads', express.static(process.cwd() + '/public/uploads'));

	server.all('*', (req: NextApiRequestExtended, res: NextApiResponse) => {
		return handle(req, res);
	});
	server.listen(port, (err: any) => {
		if (err) throw err;
		console.log(`> Ready on ${port}`);
	});
});
