"use client";

import { IDisplayComment, INewComment } from "../../../interfaces/single/comment";
import IconButton from "../artwork/IconButton";
import { stringToFrenchDate } from "../../../tools/date";
import { Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import Link from "next/link";
import { cn } from "../../../tools/cn";
import { Dispatch, SetStateAction, useState } from "react";
import CommentsList from "./CommentsList";
import { myFetch } from "../../../tools/myFetch";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { imageApi } from "../../../tools/variables";
import Fetcher from "../../fetch/Fetcher";

interface ICommentProps {
  comment: IDisplayComment;
  connectedUserId: string;
  isLoading: boolean;
  openModal: (id: string) => void;
  artPublicationId: string;
  isChild?: boolean;
  parentCommentId: string | undefined;
  setLocalComments: Dispatch<SetStateAction<IDisplayComment[]>>;
  localComments: IDisplayComment[];
}

// TODO: finish handling answer comment + likes

export default function Comment(props: ICommentProps): JSX.Element {
  const [localComments, setLocalComments] = useState<IDisplayComment[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [nbFetch, setNbFetchs] = useState(0);

  const toggleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  const handleAddAnswerComment = async (newComment: INewComment) => {
    const responseAuthor = await myFetch({ route: `/api/user/profile/${newComment.comment.userId}`, method: "GET" });

    if (responseAuthor.ok) {
      const author = responseAuthor.json as IProfileUser;

      if (props.isChild) {
        props.setLocalComments([
          {
            id: newComment.comment.id,
            profilePicture: `${imageApi}/${author.profilePicture}`,
            username: author.username,
            text: newComment.comment.text,
            createdAt: newComment.comment.createdAt,
            authorId: newComment.comment.userId,
            nestedComments: [],
          },
          ...props.localComments,
        ]);
      } else {
        setLocalComments([
          {
            id: newComment.comment.id,
            profilePicture: `${imageApi}/${author.profilePicture}`,
            username: author.username,
            text: newComment.comment.text,
            createdAt: newComment.comment.createdAt,
            authorId: newComment.comment.userId,
            nestedComments: [],
          },
          ...localComments,
        ]);
      }
      setIsCommentsVisible(true);
    }

    setReplyMessage("");
  };

  const handleReply = () => {
    if (replyMessage.trim() !== "") {
      console.log("parentCommentId: ", props.parentCommentId);
      setNbFetchs(nbFetch + 1);
      setIsReplying(false);
    }
  };

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetch}
        route={`/api/art-publication/comment/${props.artPublicationId}`}
        body={JSON.stringify({ text: replyMessage, parentCommentId: props.parentCommentId ?? props.comment.id })}
        handleOk={handleAddAnswerComment}
        successStr="Réponse ajoutée"
      />
      <div className="flex flex-col gap-4">
        <div className={cn("flex gap-4 items-center text-tertiary", props.isChild && "ml-10")}>
          <Link href={`/profile/${props.comment.authorId}`}>
            <img src={props.comment.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
          </Link>
          <div>
            <div className="flex gap-2">
              <p className="font-semibold">{props.comment.username}</p>
              <p className="text-neutral-400">{stringToFrenchDate(props.comment.createdAt)}</p>
            </div>
            <p>{props.comment.text}</p>
          </div>
          {props.comment.authorId === props.connectedUserId && (
            <IconButton
              icon={Delete}
              backgroundColor="transparent"
              iconColor="red"
              onClick={() => {
                props.openModal(props.comment.id);
              }}
              className="border hover:border-neutral-400"
              disabled={props.isLoading}
            />
          )}
          <button onClick={() => setIsReplying(true)} className="text-black text-sm">
            Répondre
          </button>
        </div>

        {isReplying && (
          <div className="flex flex-col gap-2 ml-10">
            <input
              type="text"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Écrire une réponse..."
              className="p-2 border-b border-black outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReply}
                disabled={replyMessage.trim() === ""}
                className={cn(
                  "text-white font-semibold px-4 py-2 rounded",
                  replyMessage.trim() === "" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                )}
              >
                Répondre
              </button>
              <button
                onClick={() => {
                  setIsReplying(false);
                  setReplyMessage("");
                }}
                className="text-gray-600 font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {!props.isChild && props.comment.nestedComments && props.comment.nestedComments.length > 0 && (
          <button
            onClick={toggleCommentsVisibility}
            className="flex items-center gap-2 text-blue-600 font-semibold ml-10"
          >
            {isCommentsVisible ? <ExpandLess /> : <ExpandMore />}
            {props.comment.nestedComments.length} {props.comment.nestedComments.length > 1 ? "réponses" : "réponse"}
          </button>
        )}

        {!props.isChild && isCommentsVisible && (
          <CommentsList
            connectedUserId={props.connectedUserId}
            localComments={localComments}
            setLocalComments={setLocalComments}
            isChild
            artPublicationId={props.artPublicationId}
            parentCommentId={props.comment.id}
            nestedComments={props.comment.nestedComments}
          />
        )}
      </div>
    </>
  );
}
