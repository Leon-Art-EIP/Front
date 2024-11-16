"use client";

import { useState } from "react";
import Fetcher from "../fetch/Fetcher";
import { ButtonColor } from "../lib/Button/Button";
import Switch from "../lib/Button/Switch";

interface ISwitchLocalisationProps {
  className?: string;
  color: ButtonColor;
  positionShared?: boolean;
  onRefreshCoords?: () => void;
}

export default function SwitchLocalisation(props: ISwitchLocalisationProps): JSX.Element {
  const [nbFetchs, setNbFetchs] = useState(0);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = () => {
    if (props.positionShared) {
      const userPosition = { longitude: 0, latitude: 0, disableLocation: true };

      setBody(JSON.stringify(userPosition));
      setNbFetchs(nbFetchs + 1);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const userPosition = { longitude, latitude, disableLocation: false };

        setBody(JSON.stringify(userPosition));
        setNbFetchs(nbFetchs + 1);
      });
    }
  };

  const handleOk = () => {
    if (props.onRefreshCoords) {
      props.onRefreshCoords();
    }
  };

  const label = (props.positionShared ? "Désactiver" : "Partager") + " ma localisation";

  return (
    <>
      <Fetcher
        method="POST"
        route="/api/location/update"
        nbFetchs={nbFetchs}
        body={body}
        setIsLoading={setIsLoading}
        handleOk={handleOk}
      />
      <Switch
        label={label}
        checked={props.positionShared ?? false}
        onChange={onChange}
        isLoading={isLoading}
        className={props.className}
      />
    </>
  );
}
