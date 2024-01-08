"use client";

import { FormProvider } from "react-hook-form";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import FileInput from "../../components/form/FileInput";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";
import { IOption } from "../../interfaces";
import NumberInput from "../../components/form/NumberInput";

export interface ICreateArtFormProps {
  options: IOption<string>[];
}

export default function CreateArtForm(props: ICreateArtFormProps): JSX.Element {
  const methods = useCreateArtForm();

  const handleSubmit = async (data: TCreateArtData): Promise<void> => {};

  const onSubmit = async (data: TCreateArtData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-8 py-12 px-16 border-x-2 border-x-gray-400 bg-white"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="text-2xl font-semibold">Publier</div>
        <div className="sm:grid sm:grid-cols-3 gap-12 flex flex-col">
          <FileInput title="Image" name="image" className="col-span-1" />
          <Select
            name="artType"
            title="Type d'art"
            options={props.options}
            placeholder="Sélectionner le type d'œuvre d'art"
            className="col-span-2"
          />
        </div>
        <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col">
          <Input name="name" placeholder="Titre" type="text" className="bg-secondaryGrey p-2 rounded" />
          <div className="border border-gray-400 h-0" />
        </div>
        <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col">
          <TextArea name="description" placeholder="Description" className="flex-1" />
          <div className="flex flex-col gap-4">
            <NumberInput title="Prix (€)" name="price" className="bg-secondaryGrey p-2 rounded" />
            <Input
              title="Dimensions (cm)"
              name="dimensions"
              placeholder="70cm x 50cm x 10cm"
              type="text"
              className="bg-secondaryGrey p-2 rounded"
            />
          </div>
        </div>
        <Button color="danger" type="submit" className="self-end">
          Publier
        </Button>
      </form>
    </FormProvider>
  );
}
