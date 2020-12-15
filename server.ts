import express, { Request, Response } from 'express';
import next from 'next';
import { createServer } from 'http';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const server = express();

const http = createServer(server);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(http);

const startServer = async () => {
    await app.prepare();

    server.get('/api/dog', async (_, res: Response) => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        const data = await response.json();
        return res.status(200).json(data);
    });

    let connectCounter = 0;
    io.on('connection', function (socket: any) {
        console.log('a user connected');
        connectCounter++;
        io.emit('user connected/disconnect', connectCounter);

        socket.on('disconnect', () => {
            connectCounter--;
            io.emit('user connected/disconnect', connectCounter);
            console.log('a user disconnected');
        });

        // chat
        socket.on('chatMessage', (chatMessage: string) => {
            io.emit('getChatMessage', chatMessage);
        });
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
