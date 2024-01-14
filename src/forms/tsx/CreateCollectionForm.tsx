"use client";

import { FormProvider } from "react-hook-form";
import useCreateCollectionForm from "../methods/useCreateCollectionForm";
import { TCreateCollectionData } from "../../zod";
import Input from "../../components/form/Input";
import { myFetch } from "../../tools/myFetch";
import { useState } from "react";

interface ICreateCollectionFormProps {
  handleClose: () => void;
  artId: string;
}

export default function CreateCollectionForm(props: ICreateCollectionFormProps): JSX.Element {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = useCreateCollectionForm();

  const handleSubmit = async (zodData: TCreateCollectionData): Promise<void> => {
    const response = await myFetch({
      route: "/api/collection",
      method: "POST",
      body: JSON.stringify({
        artPublicationId: props.artId,
        collectionName: zodData.collectionName,
        isPublic: true,
      }),
    });
    if (!response.ok) {
      setError("Une erreur est survenue");
    } else {
      props.handleClose();
    }
    setLoading(false);
  };

  const onSubmit = async (data: TCreateCollectionData): Promise<void> => {
    setError("");
    setLoading(true);
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
          disabled={loading}
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
        <button className="rounded-full bg-primaryRed hover:bg-red-700 p-2 text-white w-20" disabled={loading}>
          Créer
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </FormProvider>
  );
}
