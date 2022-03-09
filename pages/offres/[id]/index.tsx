import moment from "moment";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "@components/layout/layout";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";

export default function AdPage({ adv }) {
  const router = useRouter();
  if (!adv) {
    return (
      <Layout>
        <div className="text-center">Aucune annonce trouvée</div>
      </Layout>
    );
  }

  return (
    <div>
      <Layout title={adv.title}>
        <div className="block w-1/2 ml-auto mr-auto ">
          <nav className="ad-nav">
            <ol className="ol">
              <li className="li">
                <Link href="/">
                  <a>Accueil</a>
                </Link>
                <ChevronRightIcon className="w-3 h-3 mx-3 fill-current" />
              </li>

              <li className="li">
                <button
                  onClick={() =>
                    router.push(
                      `/ad-sub-categories/${adv!.ad_sub_category.slug}`
                    )
                  }
                >
                  {adv.ad_sub_category.name}
                </button>
                <ChevronRightIcon className="w-3 h-3 mx-3 fill-current" />
              </li>
              <li className="flex items-center">{adv!.title}</li>
            </ol>
          </nav>
          <div className=" my-4 text-2xl font-bold ">{adv.title}</div>
          Annonce publiée le {moment(adv.created_at).format("LL")}
          <div className="">
            <img
              className="mx-auto py-5"
              src={adv.image ? adv.image.formats.small.url : ""}
            />
          </div>
          <div className="ad-description">Description</div>
          <div className="description">{adv!.description}</div>
          <div className="contact">Contact</div>
          <div className="phone">
            {adv!.phone ? adv!.phone : "Non communiqué"}
          </div>
          <Link href={`/offres/${adv.id}/edit`}>
            <a>Modifier</a>
          </Link>
          <button
            className="ml-6 text-red-500"
            onClick={() => {
              if (confirm("Êtes-vous sûr de supprimer ?")) {
                axios
                  .delete(`${process.env.API_URL}/ads/${adv!.id}`)
                  .then(() => router.push("/"));
              }
            }}
          >
            Supprimer
          </button>
        </div>
      </Layout>{" "}
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${process.env.API_URL}/ads`);
//   const ads = await res.json();
//   const paths = ads.map((ad) => ({
//     params: { id: ad.id.toString() },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
// // export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const id = ctx.params.id as string;
//   const res = await fetch(`${process.env.API_URL}/ads/${id}`);
//   const data = await res.json();

//   return {
//     props: { data },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params.id;
  let adv = null;
  try {
    const res = await fetch(`${process.env.API_URL}/ads/${id}`);
    adv = await res.json();
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      adv,
    },
  };
};
