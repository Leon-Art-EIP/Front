"use client";

import { useEffect, useState } from "react";
import Artists from "../../components/home/artists/Artists";
import ForYou from "../../components/home/forYou/ForYou";
import PassingArts from "../../components/home/passingArt/PassingArts";
import Link from "../../components/link/Link";
import { IArticle } from "../../interfaces/home/article";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { myFetch } from "../../tools/myFetch";
import { passingArts as fakePassingArts } from "./../../components/home/passingArt/passingArts";

// TODO: lorsqu'on pourra récup les données du user connecté côté back, on pourra donc myFetch sans "use client",
// TODO: on pourra donc faire cet appel depuis le back (de l'app web) directement dans le page.tsx du home

export default function HomeWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myFetch({ method: "GET", route: "/api/article/latest" });
        const data = (await response.json()) as IArticle[];
        console.log("data", data);
        const passingArts: IPassingArt[] = data.map((article, index) => ({
          ...article,
          author: { username: article.author.username },
          mainImage: fakePassingArts[index % fakePassingArts.length].mainImage,
          position: index,
        })) as IPassingArt[];
        setPassingArts(passingArts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PassingArts passingArts={passingArts} />
      <Artists artists={[]} link={Link} />
      <ForYou forYouArts={[]} link={Link} />
    </div>
  );
}
