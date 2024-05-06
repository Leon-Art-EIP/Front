import { IPassingArt } from "../../../interfaces/home/passingArt";
import PointsPosition from "./PointsPosition";

export interface IPassingArtProps {
  passingArt: IPassingArt;
  nbrPoints: number;
  position: number;
  increasePosition: () => void;
}

export default function PassingArt(props: IPassingArtProps): JSX.Element {
  return (
    <div className="flex h-72 relative cursor-pointer" onClick={props.increasePosition}>
      <div className="absolute inset-0 z-0 w-full max-h-72 bg-black">
        <img
          src={props.passingArt.mainImage}
          alt={`mainImage-${props.passingArt.position}`}
          className="w-full max-h-72 object-contain"
        />
      </div>
      <div className="flex flex-col px-16 pt-16 pb-2 relative z-10 w-full">
        <div className="flex flex-col gap-2 text-white max-w-lg truncate h-40">
          <div className="max-w-full whitespace-normal truncate">
            <div className="text-3xl font-semibold truncate">{props.passingArt.title}</div>
          </div>
          <div className="whitespace-normal truncate text-sm max-w-full">{props.passingArt.content}</div>
        </div>
        <div className="flex flex-1 items-end justify-center">
          <PointsPosition nbrPoints={props.nbrPoints} position={props.position} />
        </div>
      </div>
    </div>
  );
}
