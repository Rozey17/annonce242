import React from "react";
import { AdSubCategoriesList } from "../adSubCategories/adSubCategoriesList";

interface Props {
  name: string;
  adCategoryId: string;
}

export const AdCategoriesList = ({ adCategoryId, name }: Props) => {
  return (
    <div className="mb-3">
      <b className="text-lg text-green-400">{name}</b>
      <AdSubCategoriesList adCategoryId={adCategoryId} />
    </div>
  );
};
