import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Particles from 'react-tsparticles';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props): JSX.Element => (
    <div>
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
                        value: '#f5f8f7',
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: '#5ADBBD',
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outMode: 'bounce',
                        random: false,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                        value: 6,
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
                | <a href="/api/users">Users API</a>
            </nav>
        </header>
        {children}
        <footer>
            <hr />
            <span>Im here to stay (Footer)</span>
        </footer>
    </div>
);

export default Layout;
