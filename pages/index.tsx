/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key } from "react";
import { AdCategoriesList } from "../components/adCategories/adCategoriesList";
import { Layout } from "../components/layout/layout";

const Home = ({ adCategories }: any) => {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
        <link
          rel="icon"
          href="https://lesplusbeauxdrapeauxdumonde.files.wordpress.com/2016/12/flag-1040567_1280-1.png"
        />
      </Head>
      <div className="ad-categories">
        {adCategories.map((x: any, index: number) => (
          <AdCategoriesList name={x.name} adCategoryId={x.id} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let adCategories = null;

  try {
    const res = await fetch(`${process.env.API_URL}/ad-categories`);
    adCategories = await res.json();
  } catch (error) {
    console.log(error);
  }
  return {
    props: { adCategories },
  };
};

export default Home;
