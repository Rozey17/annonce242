import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  adCategoryId: string;
}

export const AdSubCategoriesList = ({ adCategoryId }: Props) => {
  const [adSubCategories, setAdSubCategories] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.API_URL}/ad-sub-categories?ad_category=${adCategoryId}`
    ).then(async (res) => setAdSubCategories(await res.json()));
  }, []);

  if (!adSubCategories) {
    return <div className="">loading</div>;
  }
  return (
    <div>
      {adSubCategories.map((x: any, index) => (
        <ul key={index}>
          <li>
            <Link href={`/ad-sub-categories/${x.slug}`}>
              <a className="hover:underline">{x.name}</a>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};
