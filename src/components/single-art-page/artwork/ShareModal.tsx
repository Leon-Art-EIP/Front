"use client";

import useShareArtForm from "../../../forms/methods/useShareArtForm";
import { TShareArtData } from "../../../zod";
import Input from "../../form/Input";
import { Button, Modal } from "../../lib";
import { FormProvider } from "react-hook-form";
import { useState } from "react";
import Fetcher from "../../fetch/Fetcher";
import TextArea from "../../form/TextArea";

interface IShareModalProps {
  closeModal(): void;
  id: string;
  isOpen: boolean;
}

export default function ShareModal(props: IShareModalProps): JSX.Element {
  const methods = useShareArtForm(props.id);
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: TShareArtData) => {
    console.log("data", data);
    setBody(
      JSON.stringify({
        text: data.message,
        artPublicationId: data.id,
      })
    );
    setNbFetchs(nbFetchs + 1);
    props.closeModal();
    methods.reset();
  };

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route="/api/posts"
        successStr="Publication réussie"
        body={body}
        setIsLoading={setIsLoading}
      />
      <Modal isOpen={props.isOpen} handleClose={props.closeModal}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <TextArea
                name="message"
                placeholder="Je vous partage cette oeuvre car..."
                className="h-32 w-96 p-2 rounded focus:outline-none"
              />
              <div className="self-end">
                <Button color="primary" type="submit" loading={isLoading}>
                  Partager
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
