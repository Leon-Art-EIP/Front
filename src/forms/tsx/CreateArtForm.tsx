"use client";

import { FormProvider } from "react-hook-form";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import FileInput from "../../components/form/FileInput";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";

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
        <div className="grid grid-cols-3 gap-12">
          <FileInput title="Image" name="image" className="col-span-1" />
          <Select
            name="artType"
            title="Type d'art"
            options={[]}
            placeholder="Sélectionner le type d'œuvre d'art"
            className="col-span-2"
          />
        </div>
        <div className="flex gap-12 [&>*]:flex-1">
          <Input name="name" placeholder="Titre" type="text" className="bg-secondaryGrey p-2 rounded" />
          <div className="border border-gray-400 h-0" />
        </div>
        <div className="flex gap-12 [&>*]:flex-1">
          <TextArea name="description" placeholder="Description" className="h-32" />
          <Input name="price" placeholder="Prix" type="number" className="bg-secondaryGrey p-2 rounded" />
        </div>
      </form>
    </FormProvider>
  );
}
