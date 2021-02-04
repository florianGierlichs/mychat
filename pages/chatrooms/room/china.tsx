import styled from '@emotion/styled';
import Chat from '../../../components/Chat';
import Layout from '../../../components/Layout';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import authenticateJWT from '../../../utils/authenticateJWT';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

type PageProps = {
    username: string;
};

const UsaRoom = ({ username }: PageProps): JSX.Element => {
    const [socket, setSocket] = useState(null as any);
    const room = { name: 'china' };

    useEffect(() => {
        if (username) {
            const socketConnection = io();
            setSocket(socketConnection);
        }
    }, []);

    useEffect(() => {
        socket?.emit('joinRoom', { room, username });
        return () => {
            socket?.disconnect();
        };
    }, [socket]);

    return (
        <Layout title={room.name}>
            <Container>
                <Chat socket={socket} username={username} />
            </Container>
        </Layout>
    );
};

export default UsaRoom;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = ctx.req.cookies?.jwt;
    try {
        const { username } = authenticateJWT(jwt);
        return { props: { username } };
    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};
