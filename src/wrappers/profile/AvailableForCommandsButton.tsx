"use client";

import { useState } from "react";
import Fetcher from "../../components/fetch/Fetcher";
import IconButton from "../../components/profile/IconButton";
import Chevron from "../../components/profile/infos/Chevron";
import { cn } from "../../tools/cn";

interface IAvailableForCommandsButtonProps {
  isAvailable: boolean;
  disabled: boolean;
}

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
    <>
      <Fetcher
        route="/api/user/profile/availability"
        method="POST"
        body={JSON.stringify({
          availability: isAvailable ? "unavailable" : "available",
        })}
        nbFetchs={nbFetchs}
        handleOk={handleOk}
        successStr="Disponibilité modifiée avec succès"
      />
      <IconButton
        onClick={handleOnClick}
        text={`${isAvailable ? "Ouvert" : "Indisponible"} aux commandes`}
        className={cn("text-white h-8 flex gap-4 px-6 py-2.5", isAvailable ? "bg-green-500" : "bg-red-500")}
        icon={isAvailable ? Chevron : undefined}
        disabled={props.disabled}
      />
    </>
  );
}
