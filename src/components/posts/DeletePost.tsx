import { useState } from "react";
import { Button, Modal } from "../lib";

interface IDeletePostProps {
  onDeletePost: (postId: string) => void;
  postId: string;
}

export default function DeletePost(props: IDeletePostProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePost = () => {
    props.onDeletePost(props.postId);
  };

  return (
    <>
      <Modal handleClose={closeModal} isOpen={isModalOpen}>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl">Supprimer le post</h2>
          <p>Êtes-vous sûr de vouloir supprimer ce post ?</p>
          <div className="flex gap-2 justify-center">
            <Button color="danger" type="button" onClick={deletePost}>
              Supprimer
            </Button>
            <Button color="secondary" type="button" onClick={closeModal}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
      <button className="text-sm text-red-400" onClick={openModal}>
        Supprimer
      </button>
    </>
  );
}
