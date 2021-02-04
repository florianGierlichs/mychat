import styled from '@emotion/styled';
import Layout from '../../components/Layout';
import Link from 'next/link';
import colors from '../../utils/colors';
import { GetServerSideProps } from 'next';
import authenticateJWT from '../../utils/authenticateJWT';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 100px auto;
    background-color: white;
    max-width: 400px;
    padding: 50px;
    border: 4px solid ${colors.primary};
    position: relative;
`;

const Headline = styled.h1``;

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

const Username = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
`;

interface PageProps {
    username: string;
}

const Chatrooms = ({ username }: PageProps): JSX.Element => {
    return (
        <Layout title="chatroom">
            <Container>
                <Headline>Choose a room</Headline>
                <Username>username: {username}</Username>
                <RoomsContainer>
                    <Link href="/chatrooms/room/usa">
                        <a>USA</a>
                    </Link>
                    <Link href="/chatrooms/room/russia">
                        <a>Russia</a>
                    </Link>
                    <Link href="/chatrooms/room/china">
                        <a>China</a>
                    </Link>
                </RoomsContainer>
            </Container>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = ctx.req.cookies?.jwt;
    try {
        const { username } = authenticateJWT(jwt);
        return { props: { username } };
    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
};

export default Chatrooms;
