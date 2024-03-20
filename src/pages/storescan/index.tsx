import { NextPage } from "next";
import Head from "next/head";
import StoreScanner from "@/component/molecules/storeScanner";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <main style={{ background: "#000" }}>
        <StoreScanner />
      </main>
    </>
  );
};

export default Home;
