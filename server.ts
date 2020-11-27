import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const server = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http').Server(server);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(http);

// todo: remove require https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md

const startServer = async () => {
    await app.prepare();

    server.get('/api/dog', async (_, res: Response) => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        const data = await response.json();
        return res.status(200).json(data);
    });

    io.on('connection', function (socket: any) {
        console.log('a user connected');
        socket.emit('message', 'Hallo Welt!!!');
    });

    server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
    });

    http.listen(port, (err?: Error) => {
        if (err) throw new Error(err.message);
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
};

startServer();
