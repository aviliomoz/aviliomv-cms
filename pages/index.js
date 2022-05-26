import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>CMS | Avilio Muñoz Vilchez</title>
        <meta name="description" content="CMS for aviliomv's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout title={"Dashboard"}></Layout>
    </>
  );
}
