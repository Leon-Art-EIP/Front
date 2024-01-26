"use client";

import { useState } from "react";
import IconButton from "../../components/profile/IconButton";
import Chevron from "../../components/profile/infos/Chevron";
import { cn } from "../../tools/cn";
import { myFetch } from "../../tools/myFetch";

interface IAvailableForCommandsButtonProps {
  isAvailable: boolean;
  disabled: boolean;
}

/* c8 ignore start */

export default function AvailableForCommandsButton(props: IAvailableForCommandsButtonProps): JSX.Element {
  const [isAvailable, setIsAvailable] = useState<boolean>(props.isAvailable);

  const handleOnClick = async () => {
    const response = await myFetch({
      route: "/api/user/profile/availability",
      method: "POST",
      body: JSON.stringify({
        availability: isAvailable ? "unavailable" : "available",
      }),
    });

    if (response.ok) {
      setIsAvailable(!isAvailable);
    }
  };

  return (
    <IconButton
      onClick={handleOnClick}
      text={`${isAvailable ? "Ouvert" : "Indisponible"} aux commandes`}
      className={cn("text-white h-8", isAvailable ? "bg-green-500" : "bg-red-500")}
      icon={isAvailable ? Chevron : undefined}
      disabled={props.disabled}
    />
  );
}

/* c8 ignore stop */
