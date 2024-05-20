"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IPassingArt } from "../../../interfaces/home/passingArt";
import PassingArt from "./PassingArt";

export interface IPassingArtsProps {
  passingArts: IPassingArt[];
}

export default function PassingArts(props: IPassingArtsProps): JSX.Element {
  const router = useRouter();
  const [position, setPosition] = useState(1);

  if (props.passingArts.length === 0) {
    return <span className="text-lg font-medium italic text-tertiary">Aucun article n&apos;est disponible</span>;
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
      passingArt={props.passingArts[position - 1]}
      nbrPoints={props.passingArts.length}
      position={position}
      increasePosition={increasePosition}
    />
  );
}
