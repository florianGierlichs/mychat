import { Server } from 'http';
import formatMessage from './formatMessage';

const socket = (http: Server): void => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const io = require('socket.io')(http);

    let connectCounter = 0;
    io.on('connection', function (socket: any) {
        console.log('a user connected');
        connectCounter++;
        io.emit('connectCounter', connectCounter);

        socket.on('getCount', () => {
            console.log('getcount');
            socket.emit('connectCounter', connectCounter);
        });

        socket.on('disconnect', () => {
            connectCounter--;
            io.emit('connectCounter', connectCounter);
            console.log('a user disconnected');
        });

        // chat
        socket.on('chatMessage', (chatMessage: string) => {
            io.emit('getChatMessage', formatMessage('Foo Bar', chatMessage));
        });
    });
};

export default socket;
