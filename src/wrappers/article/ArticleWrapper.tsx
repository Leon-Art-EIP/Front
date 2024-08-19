"use client";

import { useEffect, useState } from "react";
import { IPassingArt } from "../../interfaces/home/passingArt";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import "./ArticleWrapper.css"; // Assurez-vous d'importer votre fichier CSS

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
        console.log(article.mainImage);
      }
    }
    fetchArticle();
  }, [props.id]);
  return (
    <div className="flex flex-col bg-background">
      <div className="h-64 w-screen bg-secondary">
        <img
          className="w-full h-full object-cover object-center"
          alt="articleBanner"
          // src={article?.mainImage}
          src={`${imageApi}/${article?.mainImage}`}
          // sizes={props.sizes}
          // style={props.style}
        />
      </div>
      <div className="flex w-full">
        <div className="w-40 p-4"></div>
        <div className="flex-1 bg-background p-4">
          <div className="mt-6 mb-10 text-4xl font-semibold truncate cursor-pointer text-tertiary text-center">
            {article?.title}
          </div>
          <div
            className="mt-4 text-tertiary rich-text-content"
            dangerouslySetInnerHTML={{ __html: article?.content || "" }}
          />
        </div>
        <div className="w-40 p-4"></div>
      </div>
    </div>
  );
}
