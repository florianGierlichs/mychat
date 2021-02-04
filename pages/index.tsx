import styled from '@emotion/styled';
import Layout from '../components/Layout';
import AuthenticationForm from '../components/AuthenticationForm';
import { GetServerSideProps } from 'next';
import authenticateJWT from '../utils/authenticateJWT';

const Headline = styled.h1`
    color: ${(props) => props.color};
`;

interface PageProps {
    username: string;
}

const IndexPage = ({ username }: PageProps): JSX.Element => {
    return (
        <Layout title="mychat">
            {username ? (
                <Headline color="red">Hello {username}, welcome to mychat</Headline>
            ) : (
                <>
                    <Headline color="red">Welcome, please login</Headline>
                    <AuthenticationForm />
                </>
            )}
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
        return { props: {} };
    }
};

export default IndexPage;
