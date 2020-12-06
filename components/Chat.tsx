import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatOutput from './Chatoutput';

const Container = styled.div`
    display: flex;
    margin: 50px;
`;

const UserContainer = styled.div`
    padding: 20px;
    background-color: #c4c4c4;
    min-width: 200px;
    border: 1px solid black;
`;

const ChatContainer = styled.div`
    padding: 20px;
    background-color: whitesmoke;
    border: 1px solid black;
    min-width: 400px;
`;

const Headline = styled.h2`
    margin-bottom: 50px;
`;

export default function Chat(): JSX.Element {
    return (
        <Container>
            <UserContainer>
                <Headline>user</Headline>
            </UserContainer>
            <ChatContainer>
                <ChatOutput />
                <ChatInput />
            </ChatContainer>
        </Container>
    );
}
