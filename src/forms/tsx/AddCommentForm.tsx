"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { Button } from "../../components/lib";
import { IAddComment, IDisplayComment } from "../../interfaces/single/comment";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import { TAddCommentData } from "../../zod";
import useAddCommentForm from "../methods/useAddCommentForm";

interface IAddCommentFormProps {
  id: string;
  localComments: IDisplayComment[];
  setLocalComments: Dispatch<SetStateAction<IDisplayComment[]>>;
}

export default function AddCommentForm(props: IAddCommentFormProps): JSX.Element {
  const methods = useAddCommentForm();
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");

  const comment = methods.watch("comment");

  const onSubmit = async (data: TAddCommentData): Promise<void> => {
    setBody(
      JSON.stringify({
        text: data.comment,
      })
    );
    setNbFetchs(nbFetchs + 1);
  };

  const handleOk = async (json: IAddComment) => {
    const responseAuthor = await myFetch({ route: `/api/user/profile/${json.comment.userId}`, method: "GET" });

    if (responseAuthor.ok) {
      const author = responseAuthor.json as IProfileUser;

      props.setLocalComments([
        {
          id: json.comment.id,
          profilePicture: `${imageApi}/${author.profilePicture}`,
          username: author.username,
          text: json.comment.text,
          createdAt: json.comment.createdAt,
          authorId: json.comment.userId,
        },
        ...props.localComments,
      ]);
    }
    methods.reset();
  };

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route={`/api/art-publication/comment/${props.id}`}
        body={body}
        successStr="Commentaire ajouté"
        handleOk={handleOk}
      />
      <FormProvider {...methods}>
        <form className="flex gap-2 p-2 flex-1 flex-wrap" onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          <div className="flex-1">
            <Input
              name="comment"
              placeholder="Ajouter un commentaire..."
              type="text"
              className="border border-neutral-400 rounded-full px-4 py-2 outline-none flex items-center h-10"
              hideError
            />
          </div>

          <Button
            color="danger"
            type="submit"
            className="self-start h-10 flex items-center"
            disabled={comment.length === 0}
          >
            Envoyer
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
