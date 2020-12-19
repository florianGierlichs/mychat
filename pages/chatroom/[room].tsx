import styled from '@emotion/styled';
import { GetStaticPaths, GetStaticProps } from 'next';
import Chat from '../../components/Chat';
import Layout from '../../components/Layout';
import { Room } from '../../interfaces';
import { rooms } from '../../utils/rooms';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    room?: Room;
    errors?: string;
};

const ChatroomPage = ({ room, errors }: Props): JSX.Element => {
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
                <Chat />
            </Container>
        </Layout>
    );
};

export default ChatroomPage;

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
