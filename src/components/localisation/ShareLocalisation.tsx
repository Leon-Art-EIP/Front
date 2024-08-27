"use client";

import { useState } from "react";
import Fetcher from "../fetch/Fetcher";
import { Button } from "../lib";

interface IShareLocalisationProps {
  className?: string;
}

export default function ShareLocalisation(props: IShareLocalisationProps): JSX.Element {
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const userPosition = { latitude, longitude };

      setBody(JSON.stringify(userPosition));
      setNbFetchs(nbFetchs + 1);
    });
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
      />
      <Button type="button" color="primary" className={props.className} onClick={onClick} disabled={isLoading}>
        Partager ma localisation
      </Button>
    </>
  );
}
