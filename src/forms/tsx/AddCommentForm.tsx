import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import { Button } from "../../components/lib";
import { TAddCommentData } from "../../zod";
import useAddCommentForm from "../methods/useAddCommentForm";

export default function AddCommentForm(): JSX.Element {
  const methods = useAddCommentForm();

  const onSubmit = async (data: TAddCommentData): Promise<void> => {};

  const comment = methods.watch("comment");

  return (
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
  );
}
