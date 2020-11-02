import Link from "next/link";
import { useEffect } from "react";
import Layout from "../components/Layout";

const IndexPage = (props: any) => {
  useEffect(() => {
    const getDog = async () => {
      const response = await fetch("/api/dog");
      const dog = await response.json();
      console.log(dog);
    };
    getDog();
  }, []);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Florian 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <img src={props?.data?.message} />
    </Layout>
  );
};

export default IndexPage;
