import styled from '@emotion/styled';
import { io } from 'socket.io-client';
const socket = io();

const InputForm = styled.form``;
const Input = styled.input`
    width: 350px;
`;

const Submit = styled.button``;

export default function ChatInput(): JSX.Element {
    socket.on('message', (message: string) => console.log(message));
    function sendMsg(event: { preventDefault: any }) {
        event.preventDefault();
        console.log('submit');
        event.preventDefault;
    }

    return (
        <InputForm onSubmit={sendMsg}>
            <Input />
            <Submit>Submit</Submit>
        </InputForm>
    );
}
