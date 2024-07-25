"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { Button } from "../../components/lib";
import { IAddComment, IDisplayAnswerComment, IDisplayComment } from "../../interfaces/single/comment";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import { TAddCommentData } from "../../zod";
import useAnswerCommentForm from "../methods/useAnswerCommentForm";
import { randomUUID } from "crypto";

interface IAnswerCommentFormProps {
  parentId: string;
  // localComments: IDisplayComment[];
  localAnswerComments: IDisplayAnswerComment[];
  setLocalAnswerComments: Dispatch<SetStateAction<IDisplayAnswerComment[]>>;
  connectedUser: {
    _id: string;
    profilePicture: string;
    username: string;
  };
  setIsInputVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AnswerCommentForm(props: IAnswerCommentFormProps): JSX.Element {
  const methods = useAnswerCommentForm();
  // const [nbFetchs, setNbFetchs] = useState(0);
  // const [body, setBody] = useState("");

  const comment = methods.watch("comment");

  const onSubmit = async (data: TAddCommentData): Promise<void> => {
    props.setLocalAnswerComments([
      ...props.localAnswerComments,
      {
        id: props.localAnswerComments.length.toString(),
        profilePicture: props.connectedUser.profilePicture,
        username: props.connectedUser.username,
        authorId: props.connectedUser._id,
        createdAt: new Date().toISOString(),
        text: data.comment,
        parentId: props.parentId,
      },
    ]);
    props.setIsInputVisible(false);
    // setBody(
    //   JSON.stringify({
    //     text: data.comment,
    //   })
    // );
    // setNbFetchs(nbFetchs + 1);
  };

  // const handleOk = async (json: IAddComment) => {
  //   const responseAuthor = await myFetch({ route: `/api/user/profile/${json.comment.userId}`, method: "GET" });

  //   if (responseAuthor.ok) {
  //     const author = responseAuthor.json as IProfileUser;

  //     props.setLocalComments([
  //       {
  //         id: json.comment.id,
  //         profilePicture: `${imageApi}/${author.profilePicture}`,
  //         username: author.username,
  //         text: json.comment.text,
  //         createdAt: json.comment.createdAt,
  //         authorId: json.comment.userId,
  //       },
  //       ...props.localComments,
  //     ]);
  //   }
  //   methods.reset();
  // };

  return (
    <>
      {/* <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route={`/api/art-publication/comment/${props.id}`}
        body={body}
        successStr="Réponse ajoutéé"
        handleOk={handleOk}
      /> */}
      <FormProvider {...methods}>
        <form className="flex flex-col gap-2 p-2 flex-1" onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          <div className="flex-1 text-black border border-neutral-400 bg-white rounded-md">
            <Input
              name="comment"
              placeholder="Ajouter une réponse..."
              type="text"
              className="rounded outline-none flex items-center h-10 mx-2"
              hideError
            />
            <div className="flex justify-end">
              <button className="text-blue-400 mx-2">Répondre</button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
