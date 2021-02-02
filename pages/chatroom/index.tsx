import styled from '@emotion/styled';
import Layout from '../../components/Layout';
import Link from 'next/link';
import colors from '../../utils/colors';
import { useEffect, useState } from 'react';
import { checkLocalStorage } from '../../utils/checkLocalStorage';
import { GetServerSideProps } from 'next';
import authenticateJWT from '../../utils/authenticateJWT';

interface StyledComponentProps {
    nameState: boolean;
}

const Container = styled.div<StyledComponentProps>`
    display: flex;
    flex-direction: ${({ nameState }) => (nameState ? 'column' : 'row')};
    justify-content: space-around;
    align-items: center;
    margin: 100px auto;
    background-color: white;
    max-width: 400px;
    padding: 50px;
    border: 4px solid ${colors.primary};
    position: relative;
`;

const ChooseRoom = styled.h1``;

const RoomsContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    > a {
        margin: 10px 0 10px;
        background-color: #49b69d;
        padding: 7px 14px;
        text-decoration: none;
        color: white;
        font-weight: bold;
        &:active {
            transform: scale(0.95);
        }
    }
`;

const InputForm = styled.form`
    display: flex;
    justify-content: space-between;
`;

const Input = styled.input`
    padding: 5px;
`;

const Submit = styled.button`
    padding: 5px;
`;

const Username = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
`;

const Chatroom = (): JSX.Element => {
    const [username, setUsername] = useState('');
    const [nameState, setNameState] = useState(true);
    console.log('client');
    function onInputChange(event: any) {
        setUsername(event.target.value);
    }

    function submitUsername(event: { preventDefault: any }) {
        event.preventDefault();
        if (username !== '') {
            localStorage.setItem('username', username);
            setNameState(false);
        }
    }

    useEffect(() => {
        const localStorageUsername = checkLocalStorage();
        if (localStorageUsername) {
            setNameState(false);
            setUsername(localStorageUsername);
        }
    }, []);

    return (
        <Layout title="chatroom">
            <Container nameState={nameState}>
                <ChooseRoom>Choose a {nameState ? 'name' : 'room'}</ChooseRoom>
                {nameState ? (
                    <InputForm onSubmit={submitUsername}>
                        <Input onChange={onInputChange} placeholder="Nickname" />
                        <Submit>Submit</Submit>
                    </InputForm>
                ) : (
                    <>
                        <Username>username: {username}</Username>
                        <RoomsContainer>
                            <Link href="/chatroom/usa">
                                <a>USA</a>
                            </Link>
                            <Link href="/chatroom/russia">
                                <a>Russia</a>
                            </Link>
                            <Link href="/chatroom/china">
                                <a>China</a>
                            </Link>
                        </RoomsContainer>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = ctx.req.cookies?.jwt;
    try {
        authenticateJWT(jwt);
    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return { props: {} };
};

export default Chatroom;
