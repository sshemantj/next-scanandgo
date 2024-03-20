import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import { useRef } from "react";
import styles from "@/styles/Home.module.css";

const Home: NextPage = () => {
  const ref = useRef<HTMLElement | null>(null);

  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main>
        <HomeModule />
      </main>
    </>
  );
};

export default Home;
