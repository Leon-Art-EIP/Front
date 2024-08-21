"use client";

import { useState } from "react";
import { Button, Modal } from "../../components/lib";
import NewPostForm from "../../forms/tsx/NewPostForm";
import { TNewPostData } from "../../zod";
import { INewPost } from "../../interfaces/posts";
import Fetcher from "../../components/fetch/Fetcher";
import IconButton from "../../components/single-art-page/artwork/IconButton";
import { Create } from "@mui/icons-material";

interface INewPostModalWrapperProps {
  icon?: boolean;
  onAddPost: (post: INewPost) => void;
}

export default function NewPostModalWrapper(props: INewPostModalWrapperProps): JSX.Element {
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
    props.onAddPost(json);
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
      {props.icon ? (
        <IconButton backgroundColor="bg-primary" icon={Create} iconColor="white" onClick={openModal} className="m-2 flex gap-4 px-6 py-2.5" />
      ) : (
        <Button color="primary" type="button" onClick={openModal}>
          Nouveau post
        </Button>
      )}
    </>
  );
}
