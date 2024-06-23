"use client";

import { useEffect, useState } from "react";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { myFetch } from "../../tools/myFetch";

interface IArticlesWrapperProps {
  id: string;
}

export default function ArticlesWrapper(props: IArticlesWrapperProps): JSX.Element {
  const [article, setArticle] = useState<IPassingArt>();

  useEffect(() => {
    async function fetchArticle() {
      const res = await myFetch({ route: `/api/article/${props.id}`, method: "GET" });
      if (res.ok) {
        const article = res.json as IPassingArt;
        setArticle(article);
        console.log(article.mainImage);
      }
    }
    fetchArticle();
  }, [props.id]);
  return <div className="flex flex-col bg-background"></div>;
}
