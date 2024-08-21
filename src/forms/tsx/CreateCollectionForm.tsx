"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider } from "react-hook-form";
import Input from "../../components/form/Input";
import { TCreateCollectionData } from "../../zod";
import useCreateCollectionForm from "../methods/useCreateCollectionForm";

interface ICreateCollectionFormProps {
  handleClose: () => void;
  artId: string;
  collectionsNames: string[];
  setNewCollectionBody: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  newCollectionFetchs: number;
  setNewCollectionFetchs: Dispatch<SetStateAction<number>>;
}

/* c8 ignore start */

export default function CreateCollectionForm(props: ICreateCollectionFormProps): JSX.Element {
  const methods = useCreateCollectionForm();

  const handleSubmit = async (zodData: TCreateCollectionData): Promise<void> => {
    if (props.collectionsNames.includes(zodData.collectionName)) {
      methods.setError("collectionName", { message: "Nom de collection déjà utilisé" });
      return;
    }
    props.setNewCollectionBody(
      JSON.stringify({
        artPublicationId: props.artId,
        collectionName: zodData.collectionName,
        isPublic: true,
      })
    );
    props.setNewCollectionFetchs(props.newCollectionFetchs + 1);
  };

  const onSubmit = async (data: TCreateCollectionData): Promise<void> => {
    await handleSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col sm:flex-row gap-4 justify-between self-center rounded-full p-4 bg-gray-100 items-center"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <button
          className="rounded-full bg-gray-200 hover:bg-gray-300 p-2 w-20"
          onClick={props.handleClose}
          disabled={props.isLoading}
        >
          Annuler
        </button>
        <Input
          name="collectionName"
          placeholder="Nom de la collection"
          type="text"
          className="border-none focus:outline-none p-2 rounded-full text-center"
          errorClassName="text-center"
        />
        <button className="rounded-full bg-primary hover:bg-red-700 p-2 text-white w-20" disabled={props.isLoading}>
          Créer
        </button>
      </form>
    </FormProvider>
  );
}

/* c8 ignore stop */
