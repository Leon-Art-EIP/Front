"use client";

import { useEffect, Dispatch, SetStateAction } from "react";
import { myFetch } from "../../tools/myFetch";
import { IPost } from "../../interfaces/posts";
import UserPost from "./UserPost";
import { IConnectedUser } from "../../interfaces/user/user";

interface IUserPostsProps {
  route: string;
  posts: IPost[];
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}

export default function UserPosts(props: IUserPostsProps): JSX.Element {
  let user: IConnectedUser | undefined;

  const local = localStorage.getItem("user");

  if (local) {
    user = JSON.parse(local) as IConnectedUser;
  }

  const onLike = (postId: string, isLiked: boolean) => {
    if (!user) {
      return;
    }

    const newPosts = props.posts.map((post) => {
      if (post._id !== postId) {
        return post;
      }

      return {
        ...post,
        likes: isLiked ? post.likes.filter((liker) => liker !== user.user.id) : [...post.likes, user.user.id],
      };
    });

    props.setPosts(newPosts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await myFetch({
        method: "GET",
        route: props.route,
      });

      if (reponse.ok) {
        const data = reponse.json;

        props.setPosts(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="flex flex-col overflow-y-auto divide-y divide-black h-[calc(100vh-132px)]"
      style={{ scrollbarWidth: "none" }}
    >
      {props.posts.map((post) => (
        <UserPost key={post._id} post={post} connectedUserId={user?.user.id} onLike={onLike} />
      ))}
    </div>
  );
}
