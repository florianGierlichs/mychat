import styled from '@emotion/styled';
import { useState } from 'react';
import { io } from 'socket.io-client';
const socket = io();

const InputForm = styled.form``;

const Input = styled.input`
    width: 350px;
`;

const Submit = styled.button``;

export default function ChatInput(): JSX.Element {
    const [chatMassage, setChatMessage] = useState('');

    socket.on('onConnection', (message: string) => console.log(message));

    function onInputChange(event: any) {
        setChatMessage(event.target.value);
    }

    function sendMsg(event: { preventDefault: any }) {
        event.preventDefault();
        socket.emit('chatMessage', chatMassage);
        setChatMessage('');
    }

    return (
        <InputForm onSubmit={sendMsg}>
            <Input onChange={onInputChange} value={chatMassage} />
            <Submit>Submit</Submit>
        </InputForm>
    );
}
