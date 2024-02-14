"use client";

import { useState } from "react";
import Artists from "../../components/home/artists/Artists";
import ForYou from "../../components/home/forYou/ForYou";
import PassingArts from "../../components/home/passingArt/PassingArts";
import Link from "../../components/link/Link";
import { IArticle } from "../../interfaces/home/article";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { passingArts as fakePassingArts } from "./../../components/home/passingArt/passingArtsDummyData";
import { IArtist } from "../../interfaces/home/artist";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { imageApi } from "../../tools/variables";
import Fetcher from "../../components/fetch/Fetcher";

export default function HomeWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [arts, setArts] = useState<IArtPublication[]>([]);

  const fetchArticles = (json: any) => {
    const data = json as IArticle[];
    const passingArts: IPassingArt[] = data.map((article, index) => ({
      ...article,
      author: { username: article.author.username },
      mainImage: fakePassingArts[index % fakePassingArts.length].mainImage.src, // `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${article.mainImage}`,
      position: index,
    }));
    setPassingArts(passingArts);
  };

  const handleArtistsOk = (json: any) => {
    const data = json as { artists: IArtist[] };
    const artists = data.artists.map((artist) => ({
      ...artist,
      profilePicture: `${imageApi}/${artist.profilePicture}`,
    }));
    setArtists(artists);
  };

  const handleArtsOk = (json: any) => {
    const data = json as IArtPublication[];
    const arts = data.map((art) => ({
      ...art,
      image: `${imageApi}/${art.image}`,
    }));
    setArts(arts);
  };

  return (
    <>
      <Fetcher method="GET" nbFetchs={1} route="/api/article/latest" handleOk={fetchArticles} />
      <Fetcher method="GET" nbFetchs={1} route="/api/artists/latest" handleOk={handleArtistsOk} />
      <Fetcher method="GET" nbFetchs={1} route="/api/art-publication/feed/latest" handleOk={handleArtsOk} />
      <div className="flex flex-col gap-4">
        <PassingArts passingArts={passingArts} />
        <Artists artists={artists} link={Link} />
        <ForYou forYouArts={arts} link={Link} />
      </div>
    </>
  );
}
