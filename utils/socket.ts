import { Server } from 'http';
import { Room } from '../interfaces';
import formatMessage from './formatMessage';

const socket = (http: Server): void => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const io = require('socket.io')(http);

    let rooms: Room[] = [];
    io.on('connection', function (socket: any) {
        console.log('connection');
        socket.on('joinRoom', (room: Room) => {
            socket.join(room.name);
            console.log(`a user connected in room ${room.name}`);

            let existingRoom = rooms.find((r) => r.name === room.name);

            if (existingRoom) {
                if (existingRoom.clientCount) {
                    existingRoom.clientCount = existingRoom.clientCount + 1;
                }
            }

            if (!existingRoom) {
                existingRoom = room;
                existingRoom.clientCount = 1;
                rooms.push(existingRoom);
            }

            io.to(existingRoom.name).emit('connectCounter', existingRoom.clientCount);

            socket.emit('getChatMessage', formatMessage('Bot', 'Welcome to chat!'));

            socket.on('disconnect', () => {
                if (existingRoom?.clientCount) {
                    existingRoom.clientCount--;
                }
                io.to(existingRoom?.name).emit('connectCounter', existingRoom?.clientCount);
                console.log(`a user disconnected in room ${room.name}`);
                if (existingRoom?.clientCount === 0) {
                    rooms = rooms.filter((r) => r.name !== existingRoom?.name);
                }
                console.log('rooms', rooms);
            });

            // chat
            socket.on('chatMessage', (chatMessage: string) => {
                io.to(existingRoom?.name).emit(
                    'getChatMessage',
                    formatMessage('Foo Bar', chatMessage)
                );
            });
        });
    });
};

export default socket;
