import { GetStaticProps } from "next";
import Link from "next/link";
// import { useEffect } from "react";
import Layout from "../components/Layout";

const IndexPage = (props: any) => {
  // useEffect(() => {
  //   const getDog = async () => {
  //     const response = await fetch("/api/dog");
  //     const dog = await response.json();
  //     console.log(dog);
  //   };
  //   getDog();
  // }, []);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Florian 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <img src={props?.dog?.message} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const response = await fetch("http://localhost:3000/api/dog");
  const dog = await response.json();
  return { props: { dog } };
};

export default IndexPage;
