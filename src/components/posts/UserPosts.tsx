"use client";

import { useEffect, useState } from "react";
import { myFetch } from "../../tools/myFetch";
import { IPost } from "../../interfaces/posts";
import UserPost from "./UserPost";
import { IConnectedUser } from "../../interfaces/user/user";

export default function UserPosts(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);

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
        route: "/api/posts?filter=recent",
      });

      if (reponse.ok) {
        const data = reponse.json;

        setPosts(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto h-full divide-y divide-black">
      {posts.map((post) => (
        <UserPost key={post._id} post={post} connectedUserId={user?.user.id} onLike={onLike} />
      ))}
    </div>
  );
}
