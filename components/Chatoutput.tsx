import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Output = styled.div`
    height: 70vh;
`;

const Headline = styled.h2`
    margin-bottom: 50px;
`;

export default function ChatOutput({ socket }: { socket: any }): JSX.Element {
    const [chatMessages, setChatMessages] = useState(['']);

    useEffect(() => {
        socket.on('getChatMessage', (message: string) => {
            setChatMessages([...chatMessages, message]);
        });
    });

    return (
        <Output>
            <Headline>Chat</Headline>
            {chatMessages.map((message: string) => (
                <div key={message}>{message}</div>
            ))}
        </Output>
    );
}
