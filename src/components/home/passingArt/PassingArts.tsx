import { IPassingArt } from "../../../interfaces/home/passingArt";
import PassingArt from "./PassingArt";

export interface IPassingArtsProps {
  passingArts: IPassingArt[];
  position: number;
}

export default function PassingArts(props: IPassingArtsProps): JSX.Element {
  const passingArt = props.passingArts.find((passingArt) => passingArt.position === props.position);

  if (!passingArt) {
    return <div>Aucune oeuvre à proposer</div>;
  }

  return <PassingArt passingArt={passingArt} />;
}
