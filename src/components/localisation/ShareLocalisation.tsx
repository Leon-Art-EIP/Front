"use client";

import { useState } from "react";
import Fetcher from "../fetch/Fetcher";
import { Button } from "../lib";
import { ButtonColor } from "../lib/Button/Button";
import { ICoords } from "../../wrappers/map/MapWrapper";

interface IShareLocalisationProps {
  className?: string;
  color: ButtonColor;
  refresh?: boolean;
  onRefreshCoords?: () => void;
}

export default function ShareLocalisation(props: IShareLocalisationProps): JSX.Element {
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const userPosition = { longitude, latitude };

      setBody(JSON.stringify(userPosition));
      setNbFetchs(nbFetchs + 1);
    });
  };

  const handleOk = () => {
    if (props.onRefreshCoords) {
      props.onRefreshCoords();
    }
  };

  return (
    <>
      <Fetcher
        method="POST"
        route="/api/location/update"
        nbFetchs={nbFetchs}
        body={body}
        successStr="Position mise à jour"
        setIsLoading={setIsLoading}
        handleOk={handleOk}
      />
      <Button type="button" color={props.color} className={props.className} onClick={onClick} disabled={isLoading}>
        {props.refresh ? "Rafraîchir" : "Partager"} ma localisation
      </Button>
    </>
  );
}
