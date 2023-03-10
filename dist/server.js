"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express();
    server.use('/uploads', express.static(process.cwd() + '/public/uploads'));
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on ${port}`);
    });
});
