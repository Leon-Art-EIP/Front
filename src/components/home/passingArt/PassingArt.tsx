import Image from "next/image";
import { IPassingArt } from "../../../interfaces/home/passingArt";

export interface IPassingArtProps {
  passingArt: IPassingArt;
}

export default function PassingArt(props: IPassingArtProps): JSX.Element {
  return (
    <div className="flex h-72 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={props.passingArt.mainImage}
          alt={`mainImage-${props.passingArt.position}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col gap-2 relative z-10 text-white m-16 max-w-lg truncate h-40">
        <div className="max-w-full whitespace-normal truncate">
          <div className="text-3xl font-semibold truncate">{props.passingArt.title}</div>
        </div>
        <div className="whitespace-normal truncate text-sm max-w-full">{props.passingArt.content}</div>
      </div>
    </div>
  );
}
