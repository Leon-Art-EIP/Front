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
      <div className="flex flex-col pt-16 pb-2 relative z-10">
        <div className="flex flex-col gap-2 text-secondary max-w-l truncate h-40">
          <div
            className="whitespace-normal truncate text-tertiary rounded-r-3xl px-4 py-1"
            style={{ backgroundColor: "rgba(238, 238, 238, 0.75)" }}
          >
            <div
              className="text-3xl font-semibold cursor-pointer inline-block transition duration-200 px-16"
              style={{ userSelect: "none" }}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(props.passingArt._id);
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
      </div>
    </div>
  );
}
