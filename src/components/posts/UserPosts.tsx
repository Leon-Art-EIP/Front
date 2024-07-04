"use client";

import { useEffect, useState } from "react";
import { myFetch } from "../../tools/myFetch";
import { IPost } from "../../interfaces/posts";
import UserPost from "./UserPost";
import { IConnectedUser } from "../../interfaces/user/user";

interface IUserPostsProps {
  filter: "recent" | "popular" | "user";
}

export default function UserPosts(props: IUserPostsProps): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);
  let route = "/api/posts?filter=recent";

  if (props.filter === "popular") {
    route = "/api/posts?filter=popular&timeframe=24h";
  }
  if (props.filter === "user") {
    route = "/api/posts?filter=user";
  }

  let user: IConnectedUser | undefined;

  const local = localStorage.getItem("user");

  if (local) {
    user = JSON.parse(local) as IConnectedUser;
  }

  const onLike = (postId: string, isLiked: boolean) => {
    if (!user) {
      return;
    }

    const newPosts = posts.map((post) => {
      if (post._id !== postId) {
        return post;
      }

      return {
        ...post,
        likes: isLiked ? post.likes.filter((liker) => liker !== user.user.id) : [...post.likes, user.user.id],
      };
    });

    setPosts(newPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await myFetch({
        method: "GET",
        route,
      });

      if (reponse.ok) {
        const data = reponse.json;

        setPosts(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col overflow-y-auto divide-y divide-black h-[calc(100vh-132px)]"
      style={{ scrollbarWidth: "none" }}
    >
      {posts.map((post) => (
        <UserPost key={post._id} post={post} connectedUserId={user?.user.id} onLike={onLike} />
      ))}
    </div>
  );
}
