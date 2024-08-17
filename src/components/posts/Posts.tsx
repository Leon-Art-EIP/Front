"use client";

import PostDescription from "./PostDescription";
import PostTab from "./PostTab";
import Cameleon from "../../assets/cameleon.png";
import NewPostModalWrapper from "../../wrappers/posts/NewPostModalWrapper";
import UserPosts from "./UserPosts";
import { useEffect, useState } from "react";
import { INewPost, IPost } from "../../interfaces/posts";
import { Button } from "../lib";
import Fetcher from "../fetch/Fetcher";
import IconButton from "../../components/single-art-page/artwork/IconButton";
import { Refresh } from "@mui/icons-material";
import { IConnectedUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";

interface IPostsProps {
  activeTab: "latest" | "trends" | "myposts";
  src: { src: string };
}

export default function Posts(props: IPostsProps): JSX.Element {
  const [user, setUser] = useState<IConnectedUser | undefined>(undefined);

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      setUser(localUser);
    }
  }, []);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [nbFetchs, setNbFetchs] = useState<number>(0);
  const [nbFetchsDeletePost, setNbFetchsDeletePost] = useState<number>(0);
  const [postIdToDelete, setPostIdToDelete] = useState<string>("");

  const src = Cameleon as unknown as { src: string };

  let route = "/api/posts?filter=recent";

  if (props.activeTab === "trends") {
    route = "/api/posts?filter=popular&timeframe=24h";
  }
  if (props.activeTab === "myposts") {
    route = "/api/posts?filter=user";
  }

  const onAddPost = async (post: INewPost) => {
    if (user) {
      let linkedArtPublication: IArtPublication | null = null;

      if (post.post.artPublicationId) {
        const response = await myFetch({
          method: "GET",
          route: `/api/art-publications/${post.post.artPublicationId}`,
        });

        if (response.ok) {
          linkedArtPublication = (await response.json) as IArtPublication;
        }
      }

      const newPost: IPost = {
        userId: post.post.userId,
        text: post.post.text,
        artPublicationId: post.post.artPublicationId,
        createdAt: post.post.createdAt,
        likes: post.post.likes,
        id: post.post.id,
        user: {
          username: post.user.username,
          profilePicture: post.user.profilePicture,
        },
        artPublication: linkedArtPublication ? { name: linkedArtPublication.name } : null,
      };

      setPosts([newPost, ...posts]);
    }
  };

  const onRefresh = async () => {
    setNbFetchs(nbFetchs + 1);
  };

  const handleOk = (json: IPost[]) => {
    setPosts(json);
  };

  const onDeletePost = (postId: string) => {
    setPostIdToDelete(postId);
    setNbFetchsDeletePost(nbFetchsDeletePost + 1);
  };

  const handleOkDeletePost = () => {
    if (postIdToDelete !== "") {
      setPosts(posts.filter((post) => post.id !== postIdToDelete));
      setPostIdToDelete("");
    }
  };

  return (
    <>
      <Fetcher
        method="GET"
        nbFetchs={nbFetchs}
        route={route}
        setIsLoading={setIsRefreshing}
        successStr="Posts mis à jour"
        handleOk={handleOk}
      />
      <Fetcher
        method="DELETE"
        nbFetchs={nbFetchsDeletePost}
        route={`/api/posts/${postIdToDelete}`}
        successStr="Post supprimé"
        handleOk={handleOkDeletePost}
      />
      <div className="w-screen h-full bg-white flex justify-center">
        <div className="flex-1 xl:flex xl:flex-col gap-8 items-center justify-center hidden">
          <PostDescription activeTab={props.activeTab} src={props.src.src} />
          <Button color="primary" type="button" onClick={onRefresh} disabled={isRefreshing}>
            Rafraîchir
          </Button>
        </div>
        <div className="xl:hidden flex items-center justify-center flex-1">
          <IconButton
            backgroundColor="bg-primary"
            icon={Refresh}
            iconColor="white"
            onClick={onRefresh}
            className="m-2"
            disabled={isRefreshing}
          />
        </div>
        <div className="flex flex-col border border-black h-[calc(100vh-84px)] overflow-hidden">
          <div className="flex-1 bg-neutral-100">
            <UserPosts route={route} posts={posts} setPosts={setPosts} onDeletePost={onDeletePost} user={user} />
          </div>
          <div className="flex divide-x divide-black">
            <PostTab href="/posts/latest" title="Les plus récents" isActive={props.activeTab === "latest"} />
            <PostTab href="/posts/trends" title="Tendances" isActive={props.activeTab === "trends"} />
            <PostTab href="/posts/myposts" title="Mes posts" isActive={props.activeTab === "myposts"} />
          </div>
        </div>
        <div className="flex-1 xl:flex xl:flex-col gap-2 items-center justify-center hidden">
          <img src={src.src} alt="cameleon" />
          <NewPostModalWrapper onAddPost={onAddPost} />
        </div>
        <div className="xl:hidden flex items-center justify-center flex-1">
          <NewPostModalWrapper onAddPost={onAddPost} icon />
        </div>
      </div>
    </>
  );
}
