import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { ChatProps } from '../interfaces';

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

export default function ChatInput({ socket, username }: ChatProps): JSX.Element {
    const [chatMessage, setChatMessage] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    function onInputChange(event: any) {
        setChatMessage(event.target.value);
    }

    function sendMsg(event: { preventDefault: any }) {
        event.preventDefault();
        if (chatMessage !== '') {
            socket?.emit('chatMessage', { username, chatMessage });
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
                value={chatMessage}
                ref={inputEl}
                placeholder="message"
            />
            <Submit>Submit</Submit>
        </InputForm>
    );
}
