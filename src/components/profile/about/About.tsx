"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "../../lib";

export interface IAboutProps {
  title: string;
  description: string;
  myProfile: boolean;
  handleOnModify: (inputValue: string) => void;
  ok: number;
}

/* c8 ignore start */

export default function About(props: IAboutProps): JSX.Element {
  const [description, setDescription] = useState(props.description);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnModify = async () => {
    if (inputValue.length === 0) {
      setError("La description ne peut pas être vide");
    } else {
      props.handleOnModify(inputValue);
    }
  };

  useEffect(() => {
    const updateModal = () => {
      setModalOpen(false);
      setDescription(inputValue);
    };
    if (props.ok > 0) {
      updateModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ok]);

  return (
    <>
      <Modal
        handleClose={() => {
          setModalOpen(false);
        }}
        isOpen={modalOpen}
      >
        <div className="flex flex-col gap-2">
          <div className="text-xl text-center">Nouvelle description</div>
          <input
            value={inputValue}
            onChange={handleOnChange}
            className="focus:outline-none border border-blue-100 rounded-2xl h-10 text-center"
          />
          <Button color="danger" type="button" className="self-center" onClick={handleOnModify}>
            Valider
          </Button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      </Modal>
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-justify">{props.title}</div>
        <div className="text-justify">{description ?? "Pas de biographie"}</div>
        {props.myProfile && (
          <Button
            color="danger"
            type="button"
            className="self-start"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Modifier
          </Button>
        )}
      </div>
    </>
  );
}

/* c8 ignore stop */
