"use client";

import { useEffect, useState } from "react";
import AddCommentForm from "../../../forms/tsx/AddCommentForm";
import { IDisplayComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";
import CommentsList from "./CommentsList";

interface ISingleArtPageCommentsProps {
  id: string;
  connectedUserId: string;
}

export default function SingleArtPageComments(props: ISingleArtPageCommentsProps): JSX.Element {
  const [localComments, setLocalComments] = useState<IDisplayComment[]>([]);
  const [connectedUser, setConnectedUser] = useState<{
    profilePicture: string;
    username: string;
  }>({
    profilePicture: "",
    username: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseAuthor = await myFetch({ route: `/api/user/profile/${props.connectedUserId}`, method: "GET" });

      if (responseAuthor.ok) {
        const author = responseAuthor.json as IProfileUser;

        setConnectedUser({
          profilePicture: `${imageApi}/${author.profilePicture}`,
          username: author.username,
        });
      }
    };
    fetchData();
  }, [props.connectedUserId]);

  return (
    <div className="flex flex-col gap-8 bg-background-hl rounded px-4 py-2">
      <h1 className="font-semibold text-xl text-tertiary">Commentaires</h1>
      <div className="flex flex-wrap gap-2 items-center text-tertiary">
        {connectedUser.profilePicture && (
          <img src={connectedUser.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
        )}
        <AddCommentForm id={props.id} localComments={localComments} setLocalComments={setLocalComments} />
      </div>
      <CommentsList
        id={props.id}
        connectedUserId={props.connectedUserId}
        localComments={localComments}
        setLocalComments={setLocalComments}
      />
    </div>
  );
}
