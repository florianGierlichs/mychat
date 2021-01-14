import { NextPage } from 'next';
import styled from '@emotion/styled';
import colors from '../utils/colors';
import Input from './Input';
import { useRef, useState } from 'react';

const Form = styled.form`
    margin: 100px auto;
    background-color: white;
    max-width: 200px;
    padding: 40px;
    border: 4px solid ${colors.primary};
    display: flex;
    flex-direction: column;
    > input {
        margin-bottom: 20px;
    }
    > label {
        font-size: 14px;
    }
`;

const ButtonContainer = styled.div`
    margin: 10px 0 20px;
    width: 100%;
`;

const Button = styled.button`
    padding: 5px 10px;
    cursor: pointer;
`;

const SwitchFormularContainer = styled.div`
    text-align: right;
    font-size: 14px;
`;

const SwitchFormularButton = styled.button`
    text-decoration: underline;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    &:focus {
        outline: -webkit-focus-ring-color auto 1px;
    }
    &:active {
        transform: scale(0.95);
        outline: none;
    }
`;

interface FormTypes {
    [key: string]: {
        switchFormButtonText: string;
        switchFormQuestion: string;
        switchFormAnswer: string;
    };
}

const formTypes: FormTypes = {
    login: {
        switchFormButtonText: 'Log in',
        switchFormQuestion: 'Dont have an account?',
        switchFormAnswer: 'Sign up here!',
    },
    signup: {
        switchFormButtonText: 'Sign up',
        switchFormQuestion: 'Already have an account?',
        switchFormAnswer: 'Log in here!',
    },
};

const AuthenticationForm: NextPage = () => {
    const [formType, setFormType] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const refIpunt = useRef<HTMLInputElement>(null);

    const onUsernameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleSwitchFormular = () => {
        setUsername('');
        setPassword('');

        if (formType === 'login') {
            setFormType('signup');
        }
        if (formType === 'signup') {
            setFormType('login');
        }

        refIpunt.current?.focus();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <Input
                id="username"
                fieldSize="small"
                placeholder="Username"
                value={username}
                onChange={onUsernameChange}
                ref={refIpunt}
            />
            <label htmlFor="password">Password</label>
            <Input
                id="password"
                fieldSize="small"
                placeholder="Password"
                type="password"
                value={password}
                onChange={onPasswordChange}
            />
            {formType === 'signup' && (
                <>
                    <label htmlFor="confirmPassword">confirm Password</label>
                    <Input
                        id="confirmPassword"
                        fieldSize="small"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </>
            )}
            <ButtonContainer>
                <Button type="submit">{formTypes[formType].switchFormButtonText}</Button>
            </ButtonContainer>
            <SwitchFormularContainer>
                {formTypes[formType].switchFormQuestion}
                <br />
                <SwitchFormularButton onClick={handleSwitchFormular}>
                    {formTypes[formType].switchFormAnswer}
                </SwitchFormularButton>
            </SwitchFormularContainer>
        </Form>
    );
};

export default AuthenticationForm;
