import { NextPage } from 'next';
import styled from '@emotion/styled';
import colors from '../utils/colors';
import Input from './Input';
import { useRef, useState } from 'react';
import AuthenticationError from './AuthenticationError';
import { useRouter } from 'next/router';

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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const refInput = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {
            target: { value, id },
        } = event;

        switch (id) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
        }
    };

    const signUp = async (): Promise<void> => {
        try {
            const signUpResponse = await fetch(`/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (signUpResponse.status !== 200) {
                const error = await signUpResponse.json();
                throw new Error(error.message);
            }
            // here probably set JWT token
            router.push('/chatroom');
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    const logIn = async (): Promise<void> => {
        try {
            const signUpResponse = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (signUpResponse.status !== 200) {
                const error = await signUpResponse.json();
                throw new Error(error.message);
            }
            const jwt = await signUpResponse.json();
            console.log('jwt', jwt);
            router.push('/chatroom');
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formType === 'signup') {
            setError('');
            if (username === '' || password === '' || confirmPassword === '') {
                setError('Please provide username, password and password confirmation!');
                return;
            }
            if (password !== confirmPassword) {
                setError('Confirmed Password does not match!');
                return;
            }
            signUp();
        }

        if (formType === 'login') {
            setError('');
            if (username === '' || password === '') {
                setError('Please provide username, password and password confirmation!');
                return;
            }
            logIn();
        }
    };

    const handleSwitchFormular = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');

        if (formType === 'login') {
            setFormType('signup');
        }
        if (formType === 'signup') {
            setFormType('login');
        }

        refInput.current?.focus();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <Input
                id="username"
                fieldSize="small"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                ref={refInput}
            />
            <label htmlFor="password">Password</label>
            <Input
                id="password"
                fieldSize="small"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handleInputChange}
            />
            {formType === 'signup' && (
                <>
                    <label htmlFor="confirmPassword">confirm Password</label>
                    <Input
                        id="confirmPassword"
                        fieldSize="small"
                        placeholder="Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleInputChange}
                    />
                </>
            )}
            {error !== '' && (
                <>
                    <AuthenticationError message={error} />
                </>
            )}
            <ButtonContainer>
                <Button type="submit">{formTypes[formType].switchFormButtonText}</Button>
            </ButtonContainer>
            <SwitchFormularContainer>
                {formTypes[formType].switchFormQuestion}
                <br />
                <SwitchFormularButton type="button" onClick={handleSwitchFormular}>
                    {formTypes[formType].switchFormAnswer}
                </SwitchFormularButton>
            </SwitchFormularContainer>
        </Form>
    );
};

export default AuthenticationForm;
