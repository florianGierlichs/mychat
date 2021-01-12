import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import Link from 'next/link';
// import { useEffect } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

type Dog = {
    message: string | undefined;
};

type Users = {
    username: string;
    password: string;
};

type PageProps = {
    dog: Dog;
    users: Users[];
};

const Headline = styled.h1`
    color: ${(props) => props.color};
`;

const ImageWrapper = styled.div`
    max-width: 500px;
    height: 500px;
    position: relative;
`;

const IndexPage = ({ dog, users }: PageProps): JSX.Element => {
    // useEffect(() => {
    //     console.log('hallo');
    //     const test = async () => {
    //         console.log('test');
    //         const signUpResponse = await fetch(`/api/users/signup`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username: 'relativeURL',
    //                 password: 'relativeURL',
    //             }),
    //         });
    //         if (signUpResponse.status !== 200) {
    //             const error = await signUpResponse.json();
    //             throw new Error(error.message);
    //         }
    //     };
    //     test();
    // }, []);

    // useEffect(() => {
    //     const test = async () => {
    //         console.log('test');
    //         const signUpResponse = await fetch(`/api/users/login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username: 'relativeURL',
    //                 password: 'relativeURL',
    //             }),
    //         });
    //         console.log('signUpResponse', signUpResponse);
    //         if (signUpResponse.status !== 200) {
    //             const error = await signUpResponse.json();
    //             throw new Error(error.message);
    //         }
    //     };
    //     test();
    // }, []);

    return (
        <Layout title="mychat">
            <Headline color="red">Hello Florian </Headline>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            {dog.message && (
                <ImageWrapper>
                    <Image
                        src={dog?.message}
                        alt="Random picture of a dog"
                        layout="fill"
                        objectFit="contain"
                    />
                </ImageWrapper>
            )}
            {users?.map((user) => (
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

    return { props: { dog, users }, revalidate: 1 };
};

export default IndexPage;
