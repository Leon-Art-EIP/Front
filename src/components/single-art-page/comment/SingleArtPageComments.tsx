"use client";

import { useEffect, useState } from "react";
import AddCommentForm from "../../../forms/tsx/AddCommentForm";
import { IComment, IExtendedComment } from "../../../interfaces/single/comment";
import { IProfileUser } from "../../../interfaces/user/profileUser";
import { myFetch } from "../../../tools/myFetch";
import { imageApi } from "../../../tools/variables";
import { getExtendedComments } from "./getExtendedComments";
import Comment from "./Comment";
import { Button, Modal } from "../../lib";
import Fetcher from "../../fetch/Fetcher";

interface ISingleArtPageCommentsProps {
  artPublicationId: string;
  connectedUserId: string;
}

export default function SingleArtPageComments(props: ISingleArtPageCommentsProps): JSX.Element {
  const [comments, setComments] = useState<IExtendedComment[]>([]);
  const [connectedUser, setConnectedUser] = useState<{
    profilePicture: string;
    username: string;
  }>({
    profilePicture: "",
    username: "",
  });
  const [nbDeleteFetch, setNbDeleteFetch] = useState(0);
  const [commentIdToBeDeleted, setCommentIdToBeDeleted] = useState<string>("");
  const [parentCommentIdToBeDeleted, setParentCommentIdToBeDeleted] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [responseAuthor, responseComments] = await Promise.all([
        myFetch({ route: `/api/user/profile/${props.connectedUserId}`, method: "GET" }),
        myFetch({ route: `/api/art-publication/comment/${props.artPublicationId}`, method: "GET" }),
      ]);

      if (responseAuthor.ok) {
        const author = responseAuthor.json as IProfileUser;

        setConnectedUser({
          profilePicture: `${imageApi}/${author.profilePicture}`,
          username: author.username,
        });
      }

      if (responseComments.ok) {
        const artPublicationComments = responseComments.json as IComment[];

        const extendedComments = await getExtendedComments(artPublicationComments);

        setComments(extendedComments);
      }
    };
    fetchData();
  }, [props.artPublicationId, props.connectedUserId]);

  const openDeleteModal = (commentId: string, parentCommentId: string | null) => {
    setCommentIdToBeDeleted(commentId);
    setParentCommentIdToBeDeleted(parentCommentId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCommentIdToBeDeleted("");
    setParentCommentIdToBeDeleted(null);
    setIsDeleteModalOpen(false);
  };

  const deleteCommentHandleOk = async () => {
    const updatedComments: IExtendedComment[] = [];

    comments.forEach((comment) => {
      if (comment.id === commentIdToBeDeleted) {
        return;
      }

      if (comment.id === parentCommentIdToBeDeleted) {
        updatedComments.push({
          ...comment,
          nestedComments: comment.nestedComments.filter((nestedComment) => nestedComment.id !== commentIdToBeDeleted),
        });
      } else {
        updatedComments.push(comment);
      }
    });

    setComments(updatedComments);

    closeDeleteModal();
  };

  const onLikeComment = async (commentId: string, parentCommentId: string | null, isLiked: boolean) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: isLiked
            ? [...comment.likes, props.connectedUserId]
            : comment.likes.filter((like) => like !== props.connectedUserId),
        };
      } else if (comment.id === parentCommentId) {
        return {
          ...comment,
          nestedComments: comment.nestedComments.map((nestedComment) => {
            if (nestedComment.id === commentId) {
              return {
                ...nestedComment,
                likes: isLiked
                  ? [...nestedComment.likes, props.connectedUserId]
                  : nestedComment.likes.filter((like) => like !== props.connectedUserId),
              };
            }

            return nestedComment;
          }),
        };
      }

      return comment;
    });

    setComments(updatedComments);
  };

  const onAddComment = (newComment: IExtendedComment) => {
    const updatedComments = newComment.parentCommentId
      ? comments.map((comment) => {
          if (comment.id === newComment.parentCommentId) {
            return {
              ...comment,
              nestedComments: [...comment.nestedComments, newComment],
            };
          }

          return comment;
        })
      : [...comments, newComment];

    setComments(updatedComments);
  };

  return (
    <>
      <Fetcher
        method="DELETE"
        nbFetchs={nbDeleteFetch}
        route={`/api/art-publication/comment/${commentIdToBeDeleted}`}
        successStr="Commentaire supprimé"
        handleOk={deleteCommentHandleOk}
      />
      <Modal isOpen={isDeleteModalOpen} handleClose={closeDeleteModal}>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?</h1>
          <div className="flex gap-4 items-center justify-center">
            <Button onClick={closeDeleteModal} color="secondary" type="button">
              Annuler
            </Button>
            <Button
              onClick={() => {
                setNbDeleteFetch(nbDeleteFetch + 1);
              }}
              color="danger"
              type="button"
            >
              Oui
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-8 bg-secondary rounded-2xl px-4 py-2">
        <span className="font-semibold text-xl pt-4 pl-4 text-tertiary">Commentaires</span>
        <div className="flex flex-wrap gap-2 items-center text-tertiary">
          {connectedUser.profilePicture && (
            <img src={connectedUser.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
          )}
          <AddCommentForm artPublicationId={props.artPublicationId} comments={comments} setComments={setComments} />
        </div>
        <div className="flex flex-col gap-8">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              connectedUserId={props.connectedUserId}
              openDeleteModal={openDeleteModal}
              artPublicationId={props.artPublicationId}
              onLikeComment={onLikeComment}
              onAddComment={onAddComment}
            />
          ))}
        </div>
      </div>
    </>
  );
}
