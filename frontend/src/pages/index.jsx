import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Neutrino</title>
        <meta
          content="Tokenized Real Estate Decentralized "
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}></main>
    </div>
  );
};

export default Home;
