import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatOutput from './Chatoutput';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = io();

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

const UserCount = styled.span`
    margin-left: 50px;
`;

export default function Chat(): JSX.Element {
    const [userCount, setUserCount] = useState(0);
    useEffect(() => {
        socket.on('user connected/disconnect', (count: number) => setUserCount(count));
    });

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Container>
            <UserContainer>
                <Headline>
                    Users <UserCount>{userCount}</UserCount>
                </Headline>
            </UserContainer>
            <ChatContainer>
                <ChatOutput socket={socket} />
                <ChatInput socket={socket} />
            </ChatContainer>
        </Container>
    );
}