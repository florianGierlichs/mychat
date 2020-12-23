import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import ChatOutput from './Chatoutput';
import { useEffect, useState } from 'react';
import { Room } from '../interfaces';
import colors from '../utils/colors';

const Container = styled.div`
    display: flex;
    margin: 50px;
`;

const UserContainer = styled.div`
    padding: 20px;
    background-color: whitesmoke;
    min-width: 200px;
    border: 1px solid ${colors.black};
`;

const ChatContainer = styled.div`
    padding: 20px;
    background-color: whitesmoke;
    border: 1px solid ${colors.black};
    width: 500px;
`;

const Headline = styled.h2`
    margin: 0 0 10px;
`;

const UserCount = styled.span`
    margin-left: 50px;
`;

type ChatProps = {
    socket: any;
    room?: Room | undefined;
};

export default function Chat({ socket }: ChatProps): JSX.Element {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        socket.on('connectCounter', (count: number) => {
            setUserCount(count);
        });
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
