"use client";

import { FormProvider } from "react-hook-form";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import { AddSharp } from "@mui/icons-material";
import FileInput from "../../components/form/FileInput";

export default function CreateArtForm(): JSX.Element {
  const methods = useCreateArtForm();

  const handleSubmit = async (data: TCreateArtData): Promise<void> => {};

  const onSubmit = async (data: TCreateArtData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 p-4 border-x-2 border-x-gray-400" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="text-2xl font-semibold">Publier</div>
        <div className="flex gap-4">
          <FileInput title="Image" name="image" />
        </div>
      </form>
    </FormProvider>
  );
}
