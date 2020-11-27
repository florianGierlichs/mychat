import styled from '@emotion/styled';
import Chat from '../components/Chat';
import Layout from '../components/Layout';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ChatroomPage = (): JSX.Element => {
    return (
        <Layout title="chatroom">
            <Container>
                <Chat />
            </Container>
        </Layout>
    );
};

export default ChatroomPage;
