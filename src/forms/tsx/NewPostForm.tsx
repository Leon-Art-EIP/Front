import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import { INewPost } from "../../interfaces/posts";
import { TNewPostData } from "../../zod";
import useNewPostForm from "../methods/useNewPostForm";
import { useState } from "react";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";

interface INewPostProps {
  closeModal(): void;
  onSubmit: (data: TNewPostData) => Promise<void>;
}

export default function NewPostForm(props: INewPostProps): JSX.Element {
  const methods = useNewPostForm();

  return (
    <FormProvider {...methods}>
      <form className="flex gap-2 p-2 flex-1 flex-wrap" onSubmit={methods.handleSubmit((data) => props.onSubmit(data))}>
        <div className="flex flex-col gap-4">
          <TextArea
            name="text"
            placeholder="Partagez une pensée..."
            className="h-32 w-96 p-2 rounded focus:outline-none"
          />
          <div className="self-end">
            <Button color="primary" type="submit">
              Poster
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
