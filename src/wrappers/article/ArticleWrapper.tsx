"use client";

import { useEffect, useState } from "react";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { myFetch } from "../../tools/myFetch";

interface IArticleWrapperProps {
  id: string;
}

export default function ArticleWrapper(props: IArticleWrapperProps): JSX.Element {
  const [article, setArticle] = useState<IPassingArt>();

  useEffect(() => {
    async function fetchArticle() {
      const res = await myFetch({ route: `/api/article/${props.id}`, method: "GET" });
      if (res.ok) {
        const article = res.json as IPassingArt;
        setArticle(article);
      }
    }
    fetchArticle();
  });

  return (
    <div className="flex flex-col">
      <div>Test</div>
      <div>{article?.title}</div>
      <div>Test</div>
      {/* <ProfileComponent
        profilePicture={`${imageApi}/${artist.profilePicture}`}
        banner={artist.bannerPicture.includes("default") ? banner : `${imageApi}/${artist.bannerPicture}`}
      />
      <div className="flex lg:flex-row flex-col-reverse bg-background">
        <div className="flex-1 flex flex-col gap-2 p-4"></div>
        <div className="flex justify-center">
          <Infos
            availability={artist.availability}
            artistName={artist.username}
            numberOfFollowers={artist.subscribersCount}
            followers={followers}
            followed={followed}
            numberOfPosts={publications.length}
            myProfile={myProfile}
            following={Object.keys(user).length > 0 && artist.subscribers.includes(user.user.id)}
            id={props.id}
            connectedUserId={user.user.id}
            link={Link}
          />
        </div>
      </div> */}
    </div>
  );
}
