"use client";

import { useEffect, useState } from "react";
import CreateSingleArt from "../../../components/single-art-page/create/CreateSingleArt";
import { IOption } from "../../../interfaces";
import { myFetch } from "../../../tools/myFetch";

export default function CreateSingleArtWrapper(): JSX.Element {
  const [artTypes, setArtTypes] = useState<IOption<string>[]>([]);

  useEffect(() => {
    const fetchArtTypes = async (): Promise<void> => {
      const response = await myFetch({
        route: "/api/explorer/art-types",
        method: "GET",
      });

      if (response.ok) {
        const data = (await response.json()) as { category: string; types: string[] }[];
        const artTypes = data.map((category) => ({
          label: category.category,
          value: category.category,
        }));
        setArtTypes(artTypes);
      } else {
        console.error("Erreur lors de la récupération des types d'art");
      }
    };

    fetchArtTypes();
  }, []);

  return <CreateSingleArt artTypes={artTypes} />;
}
