import { FormProvider } from "react-hook-form";
import { TNewPostData } from "../../zod";
import useNewPostForm from "../methods/useNewPostForm";
import { Dispatch, SetStateAction } from "react";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";
import { Warning } from "@mui/icons-material";

interface INewPostProps {
  setIsCreatingPost: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: TNewPostData) => Promise<void>;
  isLoading: boolean;
}

export default function CreatePostForm(props: INewPostProps): JSX.Element {
  const methods = useNewPostForm();

  const onCancel = () => {
    props.setIsCreatingPost(false);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex gap-2 p-2 flex-1 flex-wrap" onSubmit={methods.handleSubmit((data) => props.onSubmit(data))}>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-sm text-orange-500 flex gap-1 items-center">
            <Warning className="text-sm text-orange-500" /> Vous ne pouvez créer qu&apos;un post toutes les 10 minutes
          </h3>
          <TextArea
            name="text"
            placeholder="Mon nouveau post"
            className="h-64 w-full p-2 rounded focus:outline-none bg-secondary text-tertiary placeholder-tertiary"
          />
          <div className="flex justify-between">
            <Button color="secondary" type="button" onClick={onCancel} disabled={props.isLoading}>
              Annuler
            </Button>
            <Button color="primary" type="submit" loading={props.isLoading}>
              Publier
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
