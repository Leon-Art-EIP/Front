"use client";

import { useEffect, useState } from "react";
import CreateSingleArt from "../../../components/single-art-page/create/CreateSingleArt";
import { IOptionSubOptions, IOption } from "../../../interfaces";
import { myFetch } from "../../../tools/myFetch";

export default function CreateSingleArtWrapper(): JSX.Element {
  const [artTypes, setArtTypes] = useState<IOptionSubOptions<string>[]>([]);
  const [stripeAccountLinked, setStripeAccountLinked] = useState(false);

  useEffect(() => {
    const fetchArtTypes = async (): Promise<void> => {
      const response = await myFetch({
        route: "/api/explorer/art-types",
        method: "GET",
      });

      if (response.ok) {
        const data = response.json as { category: string; types: string[] }[];
        const artTypes: IOptionSubOptions<string>[] = data.map((d) => ({
          label: d.category,
          value: d.category,
          collapsed: false,
          subOptions: d.types.map((t) => ({ label: t, value: t, selected: false })),
        }));

        setArtTypes(artTypes);
        console.log(data);
      } else {
        console.error("Erreur lors de la récupération des types d'art");
      }
    };

    const fetchIsStripeAccountLinked = async (): Promise<void> => {
      const response = await myFetch({
        route: "/api/stripe/account-link-status",
        method: "GET",
      });

      if (response.ok) {
        const data = response.json as { linked: boolean };
        setStripeAccountLinked(data.linked);
      } else {
        console.error("Erreur lors de la récupération du lien avec Stripe");
      }
    };

    fetchArtTypes();
    fetchIsStripeAccountLinked();
  }, []);

  return <CreateSingleArt artTypes={artTypes} stripeAccountLinked={stripeAccountLinked} />;
}
