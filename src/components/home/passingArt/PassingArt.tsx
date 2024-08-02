"use client";

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
    // router.push(`/article/${props.users.users[index].id}`);
    router.push(`/article/${id}`);
  };

  return (
    <div className="flex h-72 relative cursor-pointer" onClick={props.increasePosition}>
      <div className="absolute inset-0 z-0 w-full h-72 bg-black">
        <img
          src={props.passingArt.mainImage}
          alt={`mainImage-${props.passingArt.position}`}
          className="w-full h-72 object-cover"
        />
      </div>
      <div className="flex flex-col px-16 pt-16 pb-2 relative z-10 w-full">
        <div className="flex flex-col gap-2 text-secondary max-w-l truncate h-40">
          <div className="max-w-full whitespace-normal truncate">
            <div
              className="text-3xl font-semibold truncate cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(props.passingArt.id);
              }}
            >
              {props.passingArt.title}
            </div>
          </div>
        </div>
        {props.numbered && (
          <div className="flex flex-1 items-end justify-center">
            <PointsPosition nbrPoints={props.nbrPoints} position={props.position} />
          </div>
        )}
        {props.archived && (
          <div className="absolute bottom-4 right-10 bg-primary text-secondary px-2 py-1 text-sm font-bold">
            Archivé
          </div>
        )}
      </div>
    </div>
  );
}
