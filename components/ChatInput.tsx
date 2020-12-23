import styled from '@emotion/styled';
import { useRef, useState } from 'react';

const InputForm = styled.form`
    display: flex;
    justify-content: space-between;
`;

const Input = styled.input`
    width: -webkit-fill-available;
    padding: 5px;
`;

const Submit = styled.button`
    padding: 5px;
`;

export default function ChatInput({ socket }: { socket: any }): JSX.Element {
    const [chatMassage, setChatMessage] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    function onInputChange(event: any) {
        setChatMessage(event.target.value);
    }

    function sendMsg(event: { preventDefault: any }) {
        event.preventDefault();
        if (chatMassage !== '') {
            socket.emit('chatMessage', chatMassage);
            setChatMessage('');
            if (inputEl.current !== null) {
                inputEl.current.focus();
            }
        }
    }

    return (
        <InputForm onSubmit={sendMsg}>
            <Input
                onChange={onInputChange}
                value={chatMassage}
                ref={inputEl}
                placeholder="message"
            />
            <Submit>Submit</Submit>
        </InputForm>
    );
}
