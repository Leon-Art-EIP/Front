"use client";

import { useEffect, useState } from "react";
import { myFetch } from "../../tools/myFetch";
import { IPost } from "../../interfaces/posts";
import UserPost from "./UserPost";

export default function UserPosts(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>([]);

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
        <UserPost post={post} />
      ))}
    </div>
  );
}
