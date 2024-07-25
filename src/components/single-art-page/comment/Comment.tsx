"use client";

import { IDisplayAnswerComment, IDisplayComment } from "../../../interfaces/single/comment";
import IconButton from "../artwork/IconButton";
import { stringToFrenchDate } from "../../../tools/date";
import { Delete } from "@mui/icons-material";
import Link from "next/link";
import AnswersCommentWrapper from "../../../wrappers/profile/AnswersCommentWrapper";
import { useState } from "react";

interface ICommentProps {
  comment: IDisplayComment;
  isLoading: boolean;
  openModal: (id: string) => void;
  displayChildrenComments: boolean;
  connectedUser: {
    _id: string;
    profilePicture: string;
    username: string;
  };
}

export default function Comment(props: ICommentProps): JSX.Element {
  const [localAnswerComments, setLocalAnswerComments] = useState<IDisplayAnswerComment[]>([]);
  const [isInputVisibile, setIsInputVisible] = useState(false);

  const onClick = () => {
    setIsInputVisible(!isInputVisibile);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center text-tertiary">
        <Link href={`/profile/${props.comment.authorId}`} className="w-11 flex-none">
          <img src={props.comment.profilePicture} alt="profile" className="rounded-3xl w-11 h-11" />
        </Link>
        <div>
          <div className="flex gap-2">
            <p className="font-semibold">{props.comment.username}</p>
            <p className="text-neutral-400">{stringToFrenchDate(props.comment.createdAt)}</p>
          </div>
          <p>{props.comment.text}</p>
        </div>
        {props.comment.authorId === props.connectedUser._id && (
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
        {props.displayChildrenComments && (
          <button className="text-gray-400 hover:underline" onClick={onClick}>
            {isInputVisibile ? "Masquer" : "Répondre"}
          </button>
        )}
      </div>
      <AnswersCommentWrapper
        displayChildrenComments={props.displayChildrenComments}
        connectedUser={props.connectedUser}
        parentId={props.comment.id}
        localAnswerComments={localAnswerComments}
        setLocalAnswerComments={setLocalAnswerComments}
        isInputVisibile={isInputVisibile}
        setIsInputVisible={setIsInputVisible}
      />
    </div>
  );
}
