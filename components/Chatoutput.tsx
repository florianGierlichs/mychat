import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import colors from '../utils/colors';

const Output = styled.div`
    padding-bottom: 5px;
`;

const Headline = styled.h2`
    margin: 0 0 10px;
`;

const Messages = styled.div`
    height: 550px;
    overflow-y: scroll;
`;

const MessageContainer = styled.div`
    background-color: ${colors.primary};
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    width: 96%;
`;

const Username = styled.span`
    font-size: 12px;
    font-weight: bold;
    margin-right: 5px;
`;

const Time = styled.span`
    font-size: 10px;
`;

const Text = styled.div`
    font-size: 18px;
    margin-top: 2px;
    overflow-wrap: break-word;
`;

interface Message {
    username: string;
    text: string;
    time: string;
}

export default function ChatOutput({ socket }: { socket: any }): JSX.Element {
    const [chatMessages, setChatMessages] = useState([] as Message[]);

    useEffect(() => {
        socket.on('getChatMessage', (message: Message) => {
            setChatMessages([...chatMessages, message]);
        });
        return () => {
            socket.off('getChatMessage');
        };
    });

    return (
        <Output>
            <Headline>Chat</Headline>
            <Messages>
                {chatMessages.map(({ username, text, time }) => (
                    <MessageContainer key={time}>
                        <Username>{username}</Username>
                        <Time>{time}</Time>
                        <Text>{text}</Text>
                    </MessageContainer>
                ))}
            </Messages>
        </Output>
    );
}
