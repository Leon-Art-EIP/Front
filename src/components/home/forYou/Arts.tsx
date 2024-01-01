import Image from "next/image";
import { ElementType } from "react";

export interface IArtsProps {
  arts: { image: string; _id: string }[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Arts({ link: Link, ...props }: IArtsProps): JSX.Element {
  return (
    <div className="flex flex-wrap overflow-y-auto gap-8">
      {props.arts.map((art) => {
        return (
          <Link href={`/single/${art._id}`} key={`art-${art._id}`}>
            <Image alt="art-image" src={art.image} width={320} height={320} className="rounded-xl" />
          </Link>
        );
      })}
    </div>
  );
}
