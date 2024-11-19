import { useRouter } from "next/navigation";
import { IPassingArt } from "../../../interfaces/home/passingArt";
import PointsPosition from "./PointsPosition";

export interface IPassingArtProps {
  numbered: boolean;
  archived: boolean;
  passingArt: IPassingArt;
  nbrPoints: number;
  position: number;
  increasePosition: () => void;
}

export default function PassingArt(props: IPassingArtProps): JSX.Element {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/article/${id}`);
  };

  return (
    <div className="flex h-72 relative cursor-default" onClick={props.increasePosition}>
      <div className="absolute inset-0 z-0 w-full h-72 bg-black">
        <img
          src={props.passingArt.mainImage}
          alt={`mainImage-${props.passingArt.position}`}
          className="w-full h-72 object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-44">
        <div className="w-full h-full bg-gradient-to-b from-black opacity-80"></div>
        <div className="absolute top-0 left-0 p-2 w-full text-white">
          <p
            className="text-4xl font-bold text-secondary cursor-pointer mx-4 my-8"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(props.passingArt._id);
            }}
          >
            {props.passingArt.title}
          </p>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        {props.numbered && (
          <PointsPosition nbrPoints={props.nbrPoints} position={props.position} />
        )}
      </div>
    </div>
  );
}
