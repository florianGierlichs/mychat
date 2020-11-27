import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatOutput from './Chatoutput';

const Container = styled.div`
    display: flex;
    margin: 50px;
`;

const UserContainer = styled.div`
    padding: 20px;
    background-color: #afafaf;
    min-width: 200px;
    border: 1px solid black;
`;

const ChatContainer = styled.div`
    padding: 20px;
    background-color: whitesmoke;
    border: 1px solid black;
    min-width: 400px;
`;

export default function Chat(): JSX.Element {
    return (
        <Container>
            <UserContainer>user</UserContainer>
            <ChatContainer>
                <ChatOutput />
                <ChatInput />
            </ChatContainer>
        </Container>
    );
}
