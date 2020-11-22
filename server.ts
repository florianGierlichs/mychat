import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const startServer = async () => {
    await app.prepare();
    const server = express();

    server.get('/api/dog', async (_, res: Response) => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        const data = await response.json();
        return res.status(200).json(data);
    });

    server.all('*', (req: Request, res: Response) => {
        return handle(req, res);
    });

    server.listen(port, (err?: any) => {
        if (err) throw err;
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
};

startServer();
