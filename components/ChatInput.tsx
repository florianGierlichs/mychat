import styled from '@emotion/styled';
import { useState } from 'react';

const InputForm = styled.form``;

const Input = styled.input`
    width: 350px;
`;

const Submit = styled.button``;

export default function ChatInput({ socket }: { socket: any }): JSX.Element {
    const [chatMassage, setChatMessage] = useState('');

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
