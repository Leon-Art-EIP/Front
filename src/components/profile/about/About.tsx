"use client";

import { useState } from "react";
import { Button, Input, Modal } from "../../lib";
import { myFetch } from "../../../tools/myFetch";

export interface IAboutProps {
  title: string;
  description: string;
  myProfile: boolean;
}

/* c8 ignore start */

export default function About(props: IAboutProps): JSX.Element {
  const [description, setDescription] = useState(props.description);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnModify = async () => {
    if (inputValue.length > 0) {
      const response = await myFetch({
        route: "/api/user/profile/bio",
        method: "POST",
        body: JSON.stringify({ description: inputValue }),
        successStr: "La description a été modifiée avec succès",
      });
      if (response.ok) {
        setModalOpen(false);
        setError("");
        setInputValue("");
        setDescription(inputValue);
      } else {
        setError("Une erreur est survenue");
      }
    } else {
      setError("La description ne peut pas être vide");
    }
  };

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
