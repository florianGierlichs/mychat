import styled from '@emotion/styled';
import { GetStaticPaths, GetStaticProps } from 'next';
import Chat from '../../components/Chat';
import Layout from '../../components/Layout';
import { Room } from '../../interfaces';
import { rooms } from '../../utils/rooms';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { checkLocalStorage } from '../../utils/checkLocalStorage';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    room?: Room;
    errors?: string;
};

const ChatRoom = ({ room, errors }: Props): JSX.Element => {
    const [username, setUsername] = useState('' as string);
    const [socket, setSocket] = useState(null as any);

    useEffect(() => {
        if (!errors) {
            const username = checkLocalStorage();
            if (username) {
                const socket = io();
                setSocket(socket);
                socket.emit('joinRoom', { room, username });
                setUsername(username);
            }
        }

        return () => {
            // disconnect funktioniert nicht, weil er sich auf socket = null bezieht und nicht den eigentlichen socket aus dem useeffect
            // io() müsste wieder außerhalb des useeffect. wenn der username vom server und nicht vom localstorage kommt, sollte das funktionieren
            // weil dann der component nicht rerendern muss (setUsername())
            // socket als props muss dann überarbeitet werden. zb nicht mehr als dependency im useeffect array
            socket?.disconnect();
        };
    }, []);

    if (errors) {
        return (
            <Layout title="Error | Next.js + TypeScript Example">
                <p>
                    <span style={{ color: 'red' }}>Error:</span> {errors}
                </p>
            </Layout>
        );
    }

    return (
        <Layout title={room?.name}>
            <Container>
                <Chat socket={socket} username={username} />
            </Container>
        </Layout>
    );
};

export default ChatRoom;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = rooms.map((room) => ({
        params: { room: room.name },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const name = params?.room;
        const room = rooms.find((room) => room.name === name);
        return { props: { room } };
    } catch (err) {
        return { props: { errors: err.message } };
    }
};
