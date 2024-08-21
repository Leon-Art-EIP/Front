"use client";

import { useEffect, useState } from "react";
import { myFetch } from "../../tools/myFetch";

interface ILikePostProps {
  connectedUserId: string | undefined;
  likes: string[];
  postId: string;
  onLike: (postId: string, isLiked: boolean) => void;
}

export default function LikePost(props: ILikePostProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const isLiked = props.connectedUserId ? props.likes.includes(props.connectedUserId) : false;

  const changeLike = async () => {
    setIsLoading(true);

    const reponse = await myFetch({
      method: "POST",
      route: `/api/posts/like/${props.postId}`,
    });

    setIsLoading(false);

    if (reponse.ok) {
      props.onLike(props.postId, isLiked);
    }
  };

  if (isLiked) {
    return (
      <div className="flex gap-2 text-sm">
        <span className="italic text-primary">Aimé</span>
        <button className="text-blue-400 disabled:text-neutral-300" onClick={changeLike} disabled={isLoading}>
          Je n&apos;aime plus
        </button>
      </div>
    );
  }

  return (
    <button className="text-sm text-blue-400 disabled:text-neutral-300" onClick={changeLike} disabled={isLoading}>
      J&apos;aime
    </button>
  );
}
