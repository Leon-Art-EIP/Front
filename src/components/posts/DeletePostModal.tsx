import { Button, Modal } from "../lib";

interface IDeletePostModalProps {
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeletePostModal(props: IDeletePostModalProps): JSX.Element {
  const onCancel = () => {
    props.handleClose();
  };

  const onDelete = () => {
    props.handleDelete();
  };

  return (
    <Modal isOpen handleClose={props.handleClose}>
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-background max-w-3xl">
        <h2>Voulez-vous vraiment supprimer ce post ?</h2>
        <div className="flex gap-8 justify-center">
          <Button type="button" color="secondary" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="button" color="primary" onClick={onDelete}>
            Oui
          </Button>
        </div>
      </div>
    </Modal>
  );
}
