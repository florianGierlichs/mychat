import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatOutput from './Chatoutput';
import { useEffect, useState } from 'react';
import { ChatProps, Room } from '../interfaces';
import colors from '../utils/colors';

const Container = styled.div`
    display: flex;
    width: 100%;
    @media (min-width: 769px) {
        width: unset;
        margin: 50px;
    }
`;

const UserContainer = styled.div`
    display: none;
    @media (min-width: 769px) {
        display: block;
        padding: 20px;
        background-color: whitesmoke;
        min-width: 200px;
        border: 1px solid ${colors.black};
    }
`;

const ChatContainer = styled.div`
    padding: 20px;
    background-color: whitesmoke;
    border: 1px solid ${colors.black};
    width: 100%;
    @media (min-width: 769px) {
        width: 500px;
    }
`;

const Headline = styled.h2`
    margin: 0 0 10px;
`;

const UserCount = styled.span`
    margin-left: 50px;
`;

const UsersContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function Chat({ socket, username }: ChatProps): JSX.Element {
    const [userCount, setUserCount] = useState(0);
    const [users, setUsers] = useState([] as string[]);

    useEffect(() => {
        socket?.on('connectCounter', (room: Room) => {
            if (room.clientCount && room.users) {
                setUserCount(room.clientCount);
                setUsers(room.users);
            }
        });
        return () => {
            socket?.off('connectCounter');
        };
    }, [socket]);

    if (!socket) {
        return <div>No Socket!</div>;
    }

    return (
        <Container>
            <UserContainer>
                <Headline>
                    Users <UserCount>{userCount}</UserCount>
                </Headline>
                <UsersContainer>
                    {users.map((user) => (
                        <div key={user}>{user}</div>
                    ))}
                </UsersContainer>
            </UserContainer>
            <ChatContainer>
                <ChatOutput socket={socket} />
                <ChatInput socket={socket} username={username} />
            </ChatContainer>
        </Container>
    );
}
