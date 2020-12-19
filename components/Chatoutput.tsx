import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Output = styled.div`
    height: 70vh;
`;

const Headline = styled.h2`
    margin-bottom: 50px;
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
            {chatMessages.map(({ username, text, time }) => (
                <div key={time}>
                    {username} {time} {text}
                </div>
            ))}
        </Output>
    );
}
