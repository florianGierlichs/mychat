import styled from '@emotion/styled';

const InputForm = styled.form``;
const Input = styled.input`
    width: 350px;
`;

const Submit = styled.button``;

export default function ChatInput(): JSX.Element {
    return (
        <InputForm>
            <Input />
            <Submit>Submit</Submit>
        </InputForm>
    );
}
