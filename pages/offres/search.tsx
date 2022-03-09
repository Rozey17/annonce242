import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "../../components/layout/layout";
import { Advertising } from "../../components/ads/ad";

export default function SearchPage({ ads }) {
  const router = useRouter();

  return (
    <Layout title="Resultats de recherche">
      {/* <Link href="/">
        <button className="flex p-2 text-white bg-indigo-500 rounded-md shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Retour
        </button>
      </Link> */}
      <div className="search-result">{`Résultats pour '${router.query.term}'`}</div>
      {ads.length === 0 && (
        <div className="ad-not-found">Aucune annonce trouvée</div>
      )}

      {ads.map((ad) => (
        <Advertising ad={ad} key={ad.id} />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { term },
}) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { title_contains: term },
        // { ad_category_contains: term },
        { description_contains: term },
        { ad_sub_category_contains: term },
      ],
    },
  });

  const res = await fetch(`${process.env.API_URL}/ads?${query}`);
  const ads = await res.json();

  return {
    props: { ads },
  };
};
