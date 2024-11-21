"use client";

import { useState } from "react";
import { IPassingArt } from "../../../interfaces/home/passingArt";
import PassingArt from "./PassingArt";

export interface IPassingArtsProps {
  passingArts: IPassingArt[];
}

export default function PassingArts(props: IPassingArtsProps): JSX.Element {
  const [position, setPosition] = useState(1);

  if (props.passingArts.length === 0) {
    return <></>;
  }

  const increasePosition = () => {
    if (position === props.passingArts.length) {
      setPosition(1);
    } else {
      setPosition(position + 1);
    }
  };

  return (
    <PassingArt
      numbered={true}
      archived={false}
      passingArt={props.passingArts[position - 1]}
      nbrPoints={props.passingArts.length}
      position={position}
      increasePosition={increasePosition}
    />
  );
}
