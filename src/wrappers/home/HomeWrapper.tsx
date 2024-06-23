"use client";

import { useState } from "react";
import UsersSlider from "../../components/explorer/UsersSlider";
import Fetcher from "../../components/fetch/Fetcher";
import Gallery4x4 from "../../components/gallery/Gallery4x4";
import Articles from "../../components/home/Articles";
import PassingArts from "../../components/home/passingArt/PassingArts";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { IUser, IUsers } from "../../interfaces/explorer/users";
import { IArtPublications } from "../../interfaces/gallery/artPublications";
import { IArticle } from "../../interfaces/home/article";
import { IPassingArt } from "../../interfaces/home/passingArt";

export default function HomeWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);
  const [artists, setArtists] = useState<IUsers>({ users: [] });
  const [arts, setArts] = useState<IArtPublications>({ artPublications: [] });

  const fetchArticles = (json: any) => {
    const data = json as IArticle[];
    const passingArts: IPassingArt[] = data.map((article, index) => ({
      ...article,
      author: { username: article.author.username },
      mainImage: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${article.mainImage}`,
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
      <div className="bg-background flex flex-col items-center">
        <div className="w-full">
          <PassingArts passingArts={passingArts} />
        </div>
        <div className="flex flex-col max-w-[1500px] w-full items-center gap-8 lg:py-8 py-4 lg:px-10 px-6">
          <div className="flex flex-col self-start gap-4 w-full">
            <span className="text-3xl font-bold text-tertiary">Artistes</span>
            <UsersSlider users={artists} />
          </div>
          <div className="flex flex-col self-start gap-4 w-full">
            <span className="text-3xl font-bold text-tertiary">Pour vous</span>
            <Gallery4x4 artPublications={arts} />
          </div>
          <footer className="w-full flex justify-center py-8 bg-secondary">
            <Articles />
          </footer>
        </div>
      </div>
    </>
  );
}
