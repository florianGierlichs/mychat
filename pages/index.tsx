import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

type Dog = {
    message: string | undefined;
};

type Users = {
    username: string;
    password: string;
};

const Headline = styled.h1`
    color: ${(props) => props.color};
`;

const IndexPage = (props: { dog: Dog; users: Users[] }): JSX.Element => {
    console.log('users in component', props.users);
    return (
        <Layout title="mychat">
            <Headline color="red">Hello Florian </Headline>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <img src={props?.dog?.message} alt="" />
            {props.users.map((user) => (
                <div key={user.username}>{user.username}</div>
            ))}
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    // Example for including static props in a Next.js function component page.
    // Don't forget to include the respective types for any props passed into
    // the component.

    const response = await fetch('http://localhost:3000/api/dog');
    const dog = await response.json();

    const usersResponse = await fetch('http://localhost:3000/api/users');
    const users = await usersResponse.json();

    const singleUserResponse = await fetch('http://localhost:3000/api/users/zweiter user');
    const user = await singleUserResponse.json();
    console.log('single user: ', user);
    return { props: { dog, users } };
};

export default IndexPage;
