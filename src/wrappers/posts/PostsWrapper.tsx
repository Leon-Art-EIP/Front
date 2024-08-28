"use client";

import PostLink from "./priv/PostLink";
import { Button } from "../../components/lib";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IPost } from "../../interfaces/posts";
import { myFetch } from "../../tools/myFetch";
import Posts from "../../components/posts/Posts";
import { CircularProgress } from "@mui/material";
import CreatePost from "../../components/posts/CreatePost";

type TFilter = "recent" | "popular" | "user";

export interface IPostsWrapperProps {
  filter: TFilter;
}

async function fetchData(
  route: `/api/posts?filter=${TFilter}`,
  setPosts: Dispatch<SetStateAction<IPost[]>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  setIsLoading(true);

  const response = await myFetch({
    route,
    method: "GET",
  });

  if (response.ok) {
    const data = response.json as IPost[];

    setPosts(data);
  }

  setIsLoading(false);
}

export default function PostsWrapper(props: IPostsWrapperProps): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const route: `/api/posts?filter=${TFilter}` = `/api/posts?filter=${props.filter}`;

  useEffect(() => {
    fetchData(route, setPosts, setArePostsLoading);
  }, [route]);

  const onRefresh = async () => {
    fetchData(route, setPosts, setIsRefreshLoading);
  };

  return (
    <>
      <div className="flex gap-8 items-center">
        <h2 className="text-sm">Filtrer par :</h2>
        <PostLink href="/posts/recent" title="Récents" active={props.filter === "recent"} />
        <PostLink href="/posts/popular" title="Popularité" active={props.filter === "popular"} />
        <PostLink href="/posts/user" title="Mes posts" active={props.filter === "user"} />
        <Button
          type="button"
          color="secondary"
          onClick={onRefresh}
          disabled={arePostsLoading}
          loading={isRefreshLoading}
          className="w-60"
        >
          Rafraîchir
        </Button>
        <Button
          type="button"
          color="primary"
          disabled={arePostsLoading || isRefreshLoading || isCreatingPost}
          className="w-60"
        >
          Créer un post
        </Button>
      </div>
      {isCreatingPost && <CreatePost />}
      {arePostsLoading ? <CircularProgress size={20} thickness={4} color="primary" /> : <Posts connectedUserId="1" />}
    </>
  );
}
