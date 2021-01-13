import { NextPage } from 'next';
import styled from '@emotion/styled';
import colors from '../utils/colors';
import Input from './Input';

const Form = styled.form`
    margin: 100px auto;
    background-color: white;
    max-width: 200px;
    padding: 40px;
    border: 4px solid ${colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonContainer = styled.div`
    margin: 5px;
    width: 100%;
`;

const Button = styled.button`
    padding: 5px 10px;
    bottom: 5px;
    right: 5px;
`;

const AuthenticationForm: NextPage = () => {
    return (
        <Form>
            <Input size="small" placeholder="Username" />
            <Input size="small" placeholder="Password" />
            <ButtonContainer>
                <Button>Log in</Button>
            </ButtonContainer>
        </Form>
    );
};

export default AuthenticationForm;
