"use client";

import { IDisplayAnswerComment, IDisplayComment } from "../../../interfaces/single/comment";
import { Button, Modal } from "../../lib";
import Comment from "./Comment";
import { Dispatch, SetStateAction, useState } from "react";

interface IAnswerCommentsListProps {
  localAnswerComments: IDisplayAnswerComment[];
  connectedUser: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  setLocalAnswerComments: Dispatch<SetStateAction<IDisplayAnswerComment[]>>;
}

export default function AnswerCommentsList(props: IAnswerCommentsListProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIdComment, setDeleteIdComment] = useState("");

  const openModal = (commentId: string) => {
    setIsModalOpen(true);
    setDeleteIdComment(commentId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteIdComment("");
  };

  const deleteComment = () => {
    props.setLocalAnswerComments(props.localAnswerComments.filter((comment) => comment.id !== deleteIdComment));
    setIsModalOpen(false);
    setDeleteIdComment("");
  };

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?</h1>
          <div className="flex gap-4 items-center justify-center">
            <Button onClick={closeModal} color="secondary" type="button">
              Annuler
            </Button>
            <Button onClick={deleteComment} color="danger" type="button">
              Oui
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col">
        {[...props.localAnswerComments].map((comment, index) => (
          <Comment
            key={`${index}-${comment.username}`}
            comment={comment}
            isLoading={false}
            openModal={openModal}
            displayChildrenComments={false}
            connectedUser={props.connectedUser}
          />
        ))}
      </div>
    </>
  );
}
