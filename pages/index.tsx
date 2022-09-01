import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center bg-gray-100 h-full">
      <Head>
        <title>Insta Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
};

export default Home;
