import styled from '@emotion/styled';
import { NextPage } from 'next';

const ErrorMessage = styled.div`
    background-color: rgba(248, 68, 68, 0.39);
    margin-top: -10px;
    padding: 2px 4px;
    font-size: 14px;
`;

interface Props {
    message: string;
}

const AuthenticationError: NextPage<Props> = ({ message }) => {
    return <ErrorMessage role="alert">{message}</ErrorMessage>;
};

export default AuthenticationError;
