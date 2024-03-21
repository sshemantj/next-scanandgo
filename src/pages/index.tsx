import HomeModule from "@/modules/homeModule";
import { NextPage } from "next";
import Navbar from "@/component/molecules/Navbar";
import Head from "next/head";
import CustomBottomNavigation from "@/component/molecules/CustomBottomNavigation";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scan-&-go!</title>
      </Head>
      <Navbar />
      <main
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <HomeModule />
        <CustomBottomNavigation />
      </main>
    </>
  );
};

export default Home;
