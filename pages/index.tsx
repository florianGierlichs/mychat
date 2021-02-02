import styled from '@emotion/styled';
import Layout from '../components/Layout';
import AuthenticationForm from '../components/AuthenticationForm';
import { GetServerSideProps } from 'next';
import authenticateJWT from '../utils/authenticateJWT';

const Headline = styled.h1`
    color: ${(props) => props.color};
`;

const IndexPage = (): JSX.Element => {
    return (
        <Layout title="mychat">
            <Headline color="red">Welcome to mychat</Headline>
            <AuthenticationForm />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const jwt = ctx.req.cookies?.jwt;
    try {
        authenticateJWT(jwt);
    } catch (err) {
        console.log(err);
        return { props: {} };
    }
    return { props: {} };
};

export default IndexPage;
