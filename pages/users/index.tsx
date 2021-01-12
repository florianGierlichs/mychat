import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { User } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
    items: User[];
};

const WithStaticProps = ({ items }: Props): JSX.Element => (
    <Layout title="Users List | Next.js + TypeScript Example">
        <h1>Users List</h1>
        <p>
            Example fetching data from inside <code>getStaticProps()</code>.
        </p>
        <p>You are currently on: /users</p>
        <List items={items} />
        <p>
            <Link href="/">
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
    const items: User[] = sampleUserData;
    return { props: { items } };
};

export default WithStaticProps;
