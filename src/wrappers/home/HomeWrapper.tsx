"use client";

import { useEffect, useState } from "react";
import PassingArts from "../../components/home/passingArt/PassingArts";
import { IArticle } from "../../interfaces/home/article";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { passingArts as fakePassingArts } from "./../../components/home/passingArt/passingArtsDummyData";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import Gallery4x4 from "../../components/gallery/Gallery4x4";
import { IArtPublications } from "../../interfaces/gallery/artPublications";
import UsersSlider from "../../components/explorer/UsersSlider";
import { IUser, IUsers } from "../../interfaces/explorer/users";
import { imageApi } from "../../tools/variables";
import Fetcher from "../../components/fetch/Fetcher";

export default function HomeWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);
  const [artists, setArtists] = useState<IUsers>({ users: [] });
  const [arts, setArts] = useState<IArtPublications>({ artPublications: [] });

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
    const data = json as { artists: IUser[] };
    setArtists({ users: data.artists });
  };

  const handleArtsOk = (json: any) => {
    const data = json as IArtPublication[];
    setArts({ artPublications: data });
  };

  return (
    <>
      <Fetcher method="GET" nbFetchs={1} route="/api/article/latest" handleOk={fetchArticles} />
      <Fetcher method="GET" nbFetchs={1} route="/api/artists/latest" handleOk={handleArtistsOk} />
      <Fetcher method="GET" nbFetchs={1} route="/api/art-publication/feed/latest" handleOk={handleArtsOk} />
      <div className="flex flex-col items-center">
        <div className="w-full">
          <PassingArts passingArts={passingArts} />
        </div>
        <div className="flex flex-col max-w-[1500px] w-full items-center gap-8 lg:py-8 py-4 lg:px-10 px-6">
          <div className="flex flex-col self-start gap-4 w-full">
            <span className="text-3xl font-bold">Artistes</span>
            <UsersSlider users={artists} />
          </div>
          <div className="flex flex-col self-start gap-4 w-full">
            <span className="text-3xl font-bold">Pour vous</span>
            <Gallery4x4 artPublications={arts} />
          </div>
        </div>
      </div>
    </>
  );
}
