/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import Link from "next/link";
import "moment/locale/fr";

export const Advertising = ({ ad }) => {
  return (
    <Link href={`/offres/${ad.id}`}>
      <div className="card">
        <img
          className="card-image"
          src={ad.image ? ad?.image?.formats?.thumbnail?.url : ""}
          alt="image"
        />
        <div className="card-text">
          <h1 className="font-bold">{ad.title}</h1>
          <br />
          <a>Publié le: {moment(ad.created_at).format("LL")}</a>
          <p>{ad.description}</p>
        </div>
      </div>
    </Link>
  );
};
