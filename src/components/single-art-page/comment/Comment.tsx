"use client";

import { IExtendedComment, ILikeComment, INewComment, TChildExtendedComment } from "../../../interfaces/single/comment";
import IconButton from "../artwork/IconButton";
import { stringToFrenchDate } from "../../../tools/date";
import { Delete, Reply, ExpandMore, ExpandLess, ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import Link from "next/link";
import { cn } from "../../../tools/cn";
import { useState } from "react";
import { myFetch } from "../../../tools/myFetch";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import Fetcher from "../../fetch/Fetcher";
import { imageApi } from "../../../tools/variables";

interface IParentCommentProps {
  comment: IExtendedComment;
  connectedUserId: string;
  openDeleteModal: (commentId: string, parentCommentId: string | null) => void;
  artPublicationId: string;
  onLikeComment: (commentId: string, parentCommentId: string | null, isLiked: boolean) => void;
  onAddComment: (comment: IExtendedComment) => void;
  parentCommentId?: never;
  isChild?: never;
}

interface IChildCommentProps {
  comment: TChildExtendedComment;
  connectedUserId: string;
  openDeleteModal: (commentId: string, parentCommentId: string | null) => void;
  artPublicationId: string;
  onLikeComment: (commentId: string, parentCommentId: string | null, isLiked: boolean) => void;
  onAddComment: (comment: IExtendedComment) => void;
  parentCommentId: string;
  isChild: true;
}

export default function Comment(props: IChildCommentProps | IParentCommentProps): JSX.Element {
  const [areChildrenCommentsVisible, setAreChildrenCommentsVisible] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [nbFetch, setNbFetchs] = useState(0);

  const isCommentLiked = props.comment.likes.includes(props.connectedUserId);

  const toggleCommentsVisibility = () => {
    setAreChildrenCommentsVisible(!areChildrenCommentsVisible);
  };

  const commentHandleOk = async (newComment: INewComment) => {
    const responseAuthor = await myFetch({ route: `/api/user/profile/${newComment.comment.userId}`, method: "GET" });

    if (responseAuthor.ok) {
      const author = responseAuthor.json as IProfileUser;

      props.onAddComment({
        ...newComment.comment,
        nestedComments: [],
        profilePicture: `${imageApi}/${author.profilePicture}`,
        username: author.username,
      });
      setAreChildrenCommentsVisible(true);
    }

    setReplyMessage("");
  };

  const handleReply = () => {
    if (replyMessage.trim() !== "") {
      setNbFetchs(nbFetch + 1);
      setIsReplying(false);
    }
  };

  const onLikeComment = async () => {
    const response = await myFetch({
      route: `/api/art-publication/comment/${props.comment.id}/like`,
      method: "POST",
    });

    if (response.ok) {
      const data = response.json as ILikeComment;

      props.onLikeComment(data.likeStatus.commentId, props.parentCommentId ?? null, data.likeStatus.isLiked);
    }
  };

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetch}
        route={`/api/art-publication/comment/${props.artPublicationId}`}
        body={JSON.stringify({ text: replyMessage, parentCommentId: props.parentCommentId ?? props.comment.id })}
        handleOk={commentHandleOk}
        successStr="Réponse ajoutée"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className={cn("flex items-center justify-between text-tertiary", props.isChild && "ml-10")}>
            <div className="flex gap-4">
              <Link href={`/profile/${props.comment.userId}`}>
                <img src={props.comment.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
              </Link>
              <div>
                <div className="flex gap-2">
                  <p className="font-semibold">{props.comment.username}</p>
                  <p className="text-neutral-400">{stringToFrenchDate(props.comment.createdAt)}</p>
                </div>
                <p>{props.comment.text}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <IconButton
                icon={Reply}
                backgroundColor="transparent"
                iconColor="black"
                onClick={() => setIsReplying(true)}
                className="border hover:border-neutral-400 flex gap-4 px-6 py-2.5"
              />
              {props.comment.userId === props.connectedUserId && (
                <IconButton
                  icon={Delete}
                  backgroundColor="transparent"
                  iconColor="black"
                  onClick={() => {
                    props.openDeleteModal(props.comment.id, props.parentCommentId ?? null);
                  }}
                  className="border hover:border-neutral-400 flex gap-4 px-6 py-2.5"
                />
              )}
            </div>
          </div>

          {isReplying && (
            <div className="flex flex-col gap-2 ml-10">
              <input
                type="text"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Écrire une réponse..."
                className="p-2 border-b border-black outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReply}
                  disabled={replyMessage.trim() === ""}
                  className={cn(
                    "text-white font-semibold px-4 py-2 rounded",
                    replyMessage.trim() === "" ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
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

          <div className={cn("self-start flex gap-2", props.isChild ? "ml-24" : "ml-14")}>
            <IconButton
              icon={isCommentLiked ? ThumbUp : ThumbUpOutlined}
              iconColor="black"
              onClick={onLikeComment}
              text={props.comment.likes.length.toString()}
              className="flex gap-2 px-2 py-1 items-center"
              iconClassName="text-lg"
              backgroundColor="bg-transparent"
            />
          </div>
        </div>

        {!props.isChild && props.comment.nestedComments && props.comment.nestedComments.length > 0 && (
          <button
            onClick={toggleCommentsVisibility}
            className="flex items-center gap-2 text-blue-600 font-semibold ml-10 self-start"
          >
            {areChildrenCommentsVisible ? <ExpandLess /> : <ExpandMore />}
            {props.comment.nestedComments.length} réponse{props.comment.nestedComments.length > 1 ? "s" : ""}
          </button>
        )}

        {!props.isChild && areChildrenCommentsVisible && (
          <div className="flex flex-col gap-8">
            {props.comment.nestedComments.map((nestedComment) => (
              <Comment
                key={nestedComment.id}
                comment={nestedComment}
                connectedUserId={props.connectedUserId}
                openDeleteModal={props.openDeleteModal}
                parentCommentId={props.comment.id}
                artPublicationId={props.artPublicationId}
                onLikeComment={props.onLikeComment}
                onAddComment={props.onAddComment}
                isChild
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
