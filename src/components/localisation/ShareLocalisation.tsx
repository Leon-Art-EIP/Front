"use client";

import { Button } from "../lib";

interface IShareLocalisationProps {
  className?: string;
}


export default function ShareLocalisation(props: IShareLocalisationProps): JSX.Element {
  const onClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const userPosition = { latitude, longitude };

      console.log("userPosition: ", userPosition);
    });
  };

  return (
    <Button type="button" color="primary" className={props.className} onClick={onClick}>
      Partager ma localisation
    </Button>
  );
}
