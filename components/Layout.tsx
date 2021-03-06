import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Particles from 'react-tsparticles';
import colors from '../utils/colors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Button = styled.button`
    padding: 5px 10px;
    position: fixed;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props): JSX.Element => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    const router = useRouter();
    let particleNumber = 4;

    async function handleLogout() {
        try {
            await fetch(`/api/users/logout`, {
                method: 'POST',
            });
            router.push('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    function getWindowWidth(): number | undefined {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            return width;
        }
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (typeof windowWidth !== 'undefined') {
        particleNumber = windowWidth < 500 ? 2 : 4;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: '#f0f5f4',
                        },
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: colors.primary,
                        },
                        collisions: {
                            enable: false,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 0.6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: particleNumber,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: 'circle',
                        },
                        size: {
                            random: true,
                            value: 400,
                        },
                    },
                    detectRetina: true,
                }}
            />
            <header>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="/about">
                        <a>About</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="/users">
                        <a>Users List</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="/chatrooms">
                        <a>chatrooms</a>
                    </Link>
                </nav>
            </header>
            <Button onClick={handleLogout}>Logout</Button>
            {children}
        </>
    );
};

export default Layout;
