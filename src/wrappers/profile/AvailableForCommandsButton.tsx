"use client";

import { useState } from "react";
import IconButton from "../../components/profile/IconButton";
import Chevron from "../../components/profile/infos/Chevron";
import { cn } from "../../tools/cn";
import { myFetch } from "../../tools/myFetch";
import FetcherDiv from "../../components/fetch/FetcherDiv";

interface IAvailableForCommandsButtonProps {
  isAvailable: boolean;
  disabled: boolean;
}

/* c8 ignore start */

export default function AvailableForCommandsButton(props: IAvailableForCommandsButtonProps): JSX.Element {
  const [isAvailable, setIsAvailable] = useState<boolean>(props.isAvailable);
  const [nbFetchs, setNbFetchs] = useState(0);

  const handleOk = () => {
    setIsAvailable(!isAvailable);
  };

  const handleOnClick = async () => {
    setNbFetchs(nbFetchs + 1);
  };

  return (
    <FetcherDiv
      route="/api/user/profile/availability"
      method="POST"
      body={JSON.stringify({
        availability: isAvailable ? "unavailable" : "available",
      })}
      nbFetchs={nbFetchs}
      handleOk={handleOk}
      successStr="Disponibilité modifiée avec succès"
    >
      <IconButton
        onClick={handleOnClick}
        text={`${isAvailable ? "Ouvert" : "Indisponible"} aux commandes`}
        className={cn("text-white h-8", isAvailable ? "bg-green-500" : "bg-red-500")}
        icon={isAvailable ? Chevron : undefined}
        disabled={props.disabled}
      />
    </FetcherDiv>
  );
}

/* c8 ignore stop */
