"use client";

import { useState } from "react";
import { Button, Modal } from "../../components/lib";
import NewPostForm from "../../forms/tsx/NewPostForm";
import { TNewPostData } from "../../zod";
import { INewPost } from "../../interfaces/posts";
import Fetcher from "../../components/fetch/Fetcher";

export default function NewPostModalWrapper(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: TNewPostData): Promise<void> => {
    setBody(
      JSON.stringify({
        text: data.text,
      })
    );
    setNbFetchs(nbFetchs + 1);
    closeModal();
  };

  const handleOk = async (json: INewPost) => {
    // TODO: locally update posts
    console.log(json);
  };

  return (
    <>
      <Fetcher
        method="POST"
        nbFetchs={nbFetchs}
        route="/api/posts"
        body={body}
        successStr="Post ajouté"
        handleOk={handleOk}
      />
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <NewPostForm closeModal={closeModal} onSubmit={onSubmit} />
      </Modal>
      <Button color="primary" type="button" onClick={openModal}>
        Nouveau post
      </Button>
    </>
  );
}
