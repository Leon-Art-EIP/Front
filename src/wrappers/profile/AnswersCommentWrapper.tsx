"use client";

import { Dispatch, SetStateAction, useState } from "react";
import AnswerCommentForm from "../../forms/tsx/AnswerCommentForm";
import { IDisplayAnswerComment } from "../../interfaces/single/comment";
import AnswerCommentsList from "../../components/single-art-page/comment/AnswerCommentsList";

interface IAnswerCommentWrapperProps {
  displayChildrenComments: boolean;
  connectedUser: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  parentId: string;
  localAnswerComments: IDisplayAnswerComment[];
  setLocalAnswerComments: Dispatch<SetStateAction<IDisplayAnswerComment[]>>;
  isInputVisibile: boolean;
  setIsInputVisible: Dispatch<SetStateAction<boolean>>;
  setDisplayAnswerComments: Dispatch<SetStateAction<boolean>>;
  displayAnswerComments: boolean;
}

export default function AnswersCommentWrapper(props: IAnswerCommentWrapperProps): JSX.Element {
  const onClick = () => {
    props.setDisplayAnswerComments(!props.displayAnswerComments);
  };

  return (
    <div className="flex">
      {props.displayChildrenComments && (
        <div className="flex justify-center w-1/6">
          <div className="h-full w-[1px] bg-neutral-400" />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        {props.displayChildrenComments && props.localAnswerComments.length > 0 && (
          <button className="text-blue-400 hover:underline" onClick={onClick}>
            {props.displayAnswerComments ? "Masquer" : "Afficher"} les réponses
          </button>
        )}
        {props.displayAnswerComments && (
          <AnswerCommentsList
            localAnswerComments={props.localAnswerComments}
            connectedUser={props.connectedUser}
            setLocalAnswerComments={props.setLocalAnswerComments}
          />
        )}
        {props.isInputVisibile && (
          <AnswerCommentForm
            localAnswerComments={props.localAnswerComments}
            setLocalAnswerComments={props.setLocalAnswerComments}
            connectedUser={props.connectedUser}
            parentId={props.parentId}
            setIsInputVisible={props.setIsInputVisible}
          />
        )}
      </div>
    </div>
  );
}
