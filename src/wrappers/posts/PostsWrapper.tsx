"use client";

import PostLink from "./priv/PostLink";
import { Button } from "../../components/lib";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ILikePost, INewPost, IPost } from "../../interfaces/posts";
import { myFetch } from "../../tools/myFetch";
import { CircularProgress } from "@mui/material";
import CreatePostForm from "../../forms/tsx/CreatePostForm";
import { TNewPostData } from "../../zod";
import Fetcher from "../../components/fetch/Fetcher";
import Post from "../../components/posts/Post";
import { IConnectedUser, IUser } from "../../interfaces/user/user";

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

    if (route === "/api/posts?filter=popular") {
      data.sort((a, b) => b.likes.length - a.likes.length);
    }

    setPosts(data);
  }

  setIsLoading(false);
}

async function likePost(postId: string) {
  const response = await myFetch({
    route: `/api/posts/like/${postId}`,
    method: "POST",
  });

  if (response.ok) {
    const data = response.json as ILikePost;

    return data;
  }

  return undefined;
}

export default function PostsWrapper(props: IPostsWrapperProps): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [arePostsLoading, setArePostsLoading] = useState(false);

  const [isRefreshLoading, setIsRefreshLoading] = useState(false);
  const [nbFetchsRefresh, setNbFetchsRefresh] = useState(0);

  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const [bodyNewPost, setBodyNewPost] = useState("");
  const [nbFetchsNewPost, setNbFetchsNewPost] = useState(0);
  const [isNewPostLoading, setIsNewPostLoading] = useState(false);

  const [nbFetchsDeletePost, setNbFetchsDeletePost] = useState(0);
  const [isDeletePostLoading, setIsDeletePostLoading] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const route: `/api/posts?filter=${TFilter}` = `/api/posts?filter=${props.filter}`;

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      setUser(localUser.user);
    }

    fetchData(route, setPosts, setArePostsLoading);
  }, [route]);

  const onRefresh = async () => {
    setNbFetchsRefresh((prev) => prev + 1);
  };

  const onCreate = () => {
    setIsCreatingPost(true);
  };

  const onDelete = (postId: string) => {
    setPostIdToDelete(postId);
    setNbFetchsDeletePost((prev) => prev + 1);
  };

  const onLike = async (postId: string) => {
    const data = await likePost(postId);

    if (data && user) {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes: data.likeStatus.isLiked ? [...post.likes, user.id] : post.likes.filter((id) => id !== user.id),
            };
          }

          return post;
        })
      );
    }
  };

  const addNewPost = async (data: TNewPostData) => {
    setBodyNewPost(JSON.stringify(data));
    setNbFetchsNewPost((prev) => prev + 1);
  };

  const handleNewPostOk = (newPost: INewPost) => {
    setIsCreatingPost(false);
    setPosts((prev) => [
      {
        ...newPost.post,
        user: newPost.user,
        artPublication: null,
      },
      ...prev,
    ]);
  };

  const handleRefreshOk = (newPosts: IPost[]) => {
    setPosts(newPosts);
  };

  const handleDeleteOk = () => {
    setPosts((prev) => prev.filter((post) => post.id !== postIdToDelete));
  };

  return (
    <div className="flex flex-col gap-10">
      <Fetcher
        method="POST"
        route="/api/posts"
        body={bodyNewPost}
        nbFetchs={nbFetchsNewPost}
        setIsLoading={setIsNewPostLoading}
        successStr="Post créé"
        handleOk={handleNewPostOk}
      />
      <Fetcher
        method="GET"
        route={route}
        nbFetchs={nbFetchsRefresh}
        setIsLoading={setIsRefreshLoading}
        successStr="Posts mis à jour"
        handleOk={handleRefreshOk}
      />
      <Fetcher
        method="DELETE"
        route={`/api/posts/${postIdToDelete}`}
        nbFetchs={nbFetchsDeletePost}
        setIsLoading={setIsDeletePostLoading}
        successStr="Post supprimé"
        handleOk={handleDeleteOk}
      />
      <div className="flex gap-10 items-center">
        <p>Filtrer par :</p>
        <PostLink href="/posts/recent" title="Récents" active={props.filter === "recent"} />
        <PostLink href="/posts/popular" title="Popularité" active={props.filter === "popular"} />
        <PostLink href="/posts/user" title="Mes posts" active={props.filter === "user"} />
        {!isCreatingPost ? (
          <>
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
              onClick={onCreate}
              disabled={arePostsLoading || isRefreshLoading}
              className="w-60"
            >
              Créer un post
            </Button>
          </>
        ) : (
          <div className="w-[512px] h-12" />
        )}
      </div>
      {isCreatingPost && (
        <>
          <CreatePostForm setIsCreatingPost={setIsCreatingPost} onSubmit={addNewPost} isLoading={isNewPostLoading} />
          <div className="h-0.5 w-1/2 bg-secondary self-center" />
        </>
      )}
      {arePostsLoading || !user ? (
        <CircularProgress size={20} thickness={4} color="primary" className="self-center" />
      ) : (
        <div className="flex flex-col gap-4 items-center p-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                connectedUserId={user.id}
                onLike={onLike}
                onDelete={onDelete}
                isDeleteLoading={isDeletePostLoading && post.id === postIdToDelete}
              />
            ))
          ) : (
            <p>Aucun post</p>
          )}
        </div>
      )}
    </div>
  );
}
