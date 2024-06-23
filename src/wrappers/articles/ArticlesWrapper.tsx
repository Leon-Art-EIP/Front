"use client";

import { useState } from "react";
import Fetcher from "../../components/fetch/Fetcher";
import PassingArt from "../../components/home/passingArt/PassingArt";
import { IArticle } from "../../interfaces/home/article";
import { IPassingArt } from "../../interfaces/home/passingArt";

export default function ArticlesWrapper(): JSX.Element {
  const [passingArts, setPassingArts] = useState<IPassingArt[]>([]);

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

  return (
    <>
      <Fetcher method="GET" nbFetchs={1} route="/api/article/latest" handleOk={fetchArticles} />
      <div className="bg-background-hl flex flex-col items-center">
        <div className="w-full flex flex-col gap-4">
          {passingArts.length === 0 ? (
            <span className="text-lg font-medium italic text-tertiary">Aucun article n&apos;est disponible</span>
          ) : (
            passingArts.map((art, index) => (
              <PassingArt
                ///////
                // archived={art.is_archived}
                archived={true}
                ///////

                numbered={false}
                key={art.position}
                passingArt={art}
                nbrPoints={passingArts.length}
                position={index + 1}
                increasePosition={() => {}}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
