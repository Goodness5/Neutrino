import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import HomeGallery from "../components/home/HomeGallery";
import HomeHero from "../components/home/HomeHero";
import HomeDescribe from "../components/home/HomeDescribe";
import HomeImage from "../components/home/HomeImage";
import HomePartners from "../components/home/HomePartners";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ProChain</title>
        <meta
          content="Tokenized Real Estate Decentralized "
          name="description"
        />
        <link href="/favicon.png" rel="icon" />
      </Head>

      <main className={styles.main}>
        <HomeHero />
        <HomeGallery />
        <HomeDescribe />
        <HomeImage />
        <HomePartners />
      </main>
    </div>
  );
};

export default Home;
