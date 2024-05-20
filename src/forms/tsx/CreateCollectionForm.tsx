"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import Fetcher from "../../components/fetch/Fetcher";
import Input from "../../components/form/Input";
import { TCreateCollectionData } from "../../zod";
import useCreateCollectionForm from "../methods/useCreateCollectionForm";

interface ICreateCollectionFormProps {
  handleClose: () => void;
  artId: string;
}

/* c8 ignore start */

export default function CreateCollectionForm(props: ICreateCollectionFormProps): JSX.Element {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const methods = useCreateCollectionForm();
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");

  const handleOk = () => {
    props.handleClose();
  };

  const handleSubmit = async (zodData: TCreateCollectionData): Promise<void> => {
    setBody(
      JSON.stringify({
        artPublicationId: props.artId,
        collectionName: zodData.collectionName,
        isPublic: true,
      })
    );
    setNbFetchs(nbFetchs + 1);
  };

  const onSubmit = async (data: TCreateCollectionData): Promise<void> => {
    setError("");
    setLoading(true);
    await handleSubmit(data);
  };

  return (
    <>
      <Fetcher
        method="POST"
        route="/api/collection"
        body={body}
        handleOk={handleOk}
        nbFetchs={nbFetchs}
        setIsLoading={setLoading}
      />
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
          <button className="rounded-full bg-primary hover:bg-red-700 p-2 text-white w-20" disabled={loading}>
            Créer
          </button>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </FormProvider>
    </>
  );
}

/* c8 ignore stop */
