"use client";

import React from "react";
import Button from "../Button";

export type TCategory =
  | "Huile"
  | "Aquarelle"
  | "Acrylique"
  | "Gouache"
  | "Tempéra"
  | "Fresque"
  | "Crayon"
  | "Fusain"
  | "Encre"
  | "Pastel"
  | "Sanguine"
  | "Craie"
  | "Photographie argentique"
  | "Photographie numérique"
  | "Photographie noir et blanc"
  | "Photographe couleur"
  | "Bronze"
  | "Pierre"
  | "Bois"
  | "Résine"
  | "Céramique"
  | "Verre"
  | "Porcelaine"
  | "Faïence"
  | "Grès"
  | "Terre cuite"
  | "Broderie"
  | "Tapisserie"
  | "Art vestimentaire"
  | "Linogravure"
  | "Eau-forte"
  | "Lithographie"
  | "Sérigraphie"
  | "Monotype"
  | "Soufflage de verre"
  | "Vitrail"
  | "Fusing"
  | "Joaillerie"
  | "Ebénisterie"
  | "Marqueterie"
  | "Ferronnerie d'art";

export interface ICategoryProps {
  category: TCategory;
}

/* c8 ignore start */
export default function Category(props: ICategoryProps): JSX.Element {
  return (
    <Button
      onClick={() => {}}
      text={props.category}
      className="text-[#4A4A4A] font-semibold bg-white"
    />
  );
}
/* c8 ignore end */
