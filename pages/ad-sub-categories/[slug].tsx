import { GetServerSideProps } from "next";
import { useState } from "react";
import { Advertising } from "@components/ads/ad";
import { Layout } from "@components/layout/layout";

export default function AdSubCategoriesPage({ ads, adSubCategory }) {
  if (ads.length === 0) {
    return (
      <Layout>
        <div className="">
          <h1 className="ads-sub-categories">{`Annonces ${adSubCategory.name}`}</h1>
          <h1 className="ads-sub-categories">Aucune annonce trouvée</h1>;
        </div>
      </Layout>
    );
  }
  return (
    <Layout title={`Annonces ${adSubCategory.name}`}>
      <div className="">
        <h1 className="ads-sub-categories">{`Annonces ${adSubCategory.name}`}</h1>
        {ads.map((ad) => (
          <Advertising ad={ad} key={ad.id} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params.slug;

  const res = await fetch(
    `${process.env.API_URL}/ads?ad_sub_category.slug=${slug}`
  );

  const data = await fetch(
    `${process.env.API_URL}/ad-sub-categories?slug=${slug}`
  );

  const ads = await res.json();

  const adSubCategory = await data.json();

  return {
    props: {
      ads,
      adSubCategory: adSubCategory[0],
    },
  };
};
