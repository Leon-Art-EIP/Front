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
import { IArtist } from "../../interfaces/home/artist";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { imageApi } from "../../tools/variables";

// TODO: lorsqu'on pourra récup les données du user connecté côté back, on pourra donc myFetch sans "use client",
// TODO: on pourra donc faire cet appel depuis le back (de l'app web) directement dans le page.tsx du home

export default function HomeWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [arts, setArts] = useState<IArtPublication[]>([]);

  const fetchArticles = async () => {
    try {
      const response = await myFetch({ method: "GET", route: "/api/article/latest" });
      const data = (await response.json()) as IArticle[];
      const passingArts: IPassingArt[] = data.map((article, index) => ({
        ...article,
        author: { username: article.author.username },
        mainImage: fakePassingArts[index % fakePassingArts.length].mainImage, // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${article.mainImage}`,
        position: index,
      }));
      setPassingArts(passingArts);
    } catch (error) {
      console.error("Error fetching latest article:", error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await myFetch({ method: "GET", route: "/api/artists/latest" });
      const data = (await response.json()) as { artists: IArtist[] };
      const artists = data.artists.map((artist) => ({
        ...artist,
        profilePicture: `${imageApi}/${artist.profilePicture}`,
      }));
      setArtists(artists);
    } catch (error) {
      console.error("Error fetching latest artists:", error);
    }
  };

  const fetchArts = async () => {
    try {
      const response = await myFetch({ method: "GET", route: "/api/art-publication/feed/latest" });
      const data = (await response.json()) as IArtPublication[];
      const arts = data.map((art) => ({
        ...art,
        image: `${imageApi}/${art.image}`,
      }));
      setArts(arts);
    } catch (error) {
      console.error("Error fetching latest arts:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchArtists();
    fetchArts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PassingArts passingArts={passingArts} />
      <Artists artists={artists} link={Link} />
      <ForYou forYouArts={arts} link={Link} />
    </div>
  );
}
