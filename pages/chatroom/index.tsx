import styled from '@emotion/styled';
import Layout from '../../components/Layout';
import Link from 'next/link';
import colors from '../../utils/colors';

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 100px auto;
    background-color: white;
    max-width: 400px;
    padding: 50px;
    border: 4px solid ${colors.primary};
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

const Chatroom = (): JSX.Element => {
    return (
        <Layout title="chatroom">
            <Container>
                <ChooseRoom>Choose a room</ChooseRoom>
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
            </Container>
        </Layout>
    );
};

export default Chatroom;
