"use client";

import { FormProvider } from "react-hook-form";
import { TCreateArtData } from "../../zod";
import useCreateArtForm from "../methods/useCreateArtForm";
import FileInput from "../../components/form/FileInput";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import { Button } from "../../components/lib";
import { IError, IOption } from "../../interfaces";
import NumberInput from "../../components/form/NumberInput";
import Checkbox from "../../components/form/Checkbox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { appendFormData } from "../../tools/formData";
import FetcherDiv from "../../components/fetch/FetcherDiv";

export interface ICreateArtFormProps {
  artTypes: IOption<string>[];
}

export default function CreateArtForm(props: ICreateArtFormProps): JSX.Element {
  const methods = useCreateArtForm();
  const isForSale = methods.watch("isForSale");
  const router = useRouter();
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState<FormData>();

  const handleSubmit = async (zodData: TCreateArtData): Promise<void> => {
    const formData = new FormData();

    appendFormData(formData, zodData);

    setBody(formData);
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TCreateArtData): Promise<void> => {
    data.price = data.isForSale ? data.price : undefined;
    await handleSubmit(data);
  };

  const handleOk = (json: any) => {
    const data = json as { msg: string; artPublication: { id: string } } | IError;

    if ("artPublication" in data) {
      router.push(`/single/${data.artPublication.id}`);
    }
  };

  return (
    <FetcherDiv method="POST" route="/api/art-publication" nbFetchs={nbFetchs} body={body} handleOk={handleOk}>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-8 py-12 px-16 border-x-2 border-x-gray-400 bg-white h-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="text-2xl font-semibold">Publier</div>
          <div className="sm:grid sm:grid-cols-3 gap-12 flex flex-col flex-1">
            <FileInput name="image" />
            <Select
              name="artType"
              title="Type d'art"
              options={props.artTypes}
              placeholder="Sélectionner le type d'œuvre d'art"
              className="col-span-2"
            />
          </div>
          <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col">
            <Input name="name" placeholder="Titre" type="text" className="bg-secondaryGrey p-2 rounded" />
            <div className="border border-gray-400 h-0" />
          </div>
          <div className="flex gap-12 [&>*]:flex-1 sm:flex-wrap sm:flex-row flex-col flex-1">
            <TextArea name="description" placeholder="Description" className="flex-1" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-8 items-center">
                <Checkbox name="isForSale" title="A vendre" />
                {isForSale && <NumberInput title="Prix (€)" name="price" className="bg-secondaryGrey p-2 rounded" />}
              </div>
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
    </FetcherDiv>
  );
}
