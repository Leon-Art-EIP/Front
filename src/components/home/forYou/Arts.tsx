import Image from "next/image";
import { ElementType } from "react";

export interface IArtsProps {
  arts: { image: string; _id: string }[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

/* c8 ignore start */

export default function Arts({ link: Link, ...props }: IArtsProps): JSX.Element {
  return (
    <div className="max-h-full flex flex-wrap gap-8 justify-around p-4">
      {props.arts.map((art) => {
        return (
          <Link
            href={`/single/${art._id}`}
            key={`art-${art._id}`}
            className="border border-secondaryGrey hover:bg-secondaryGrey p-2 rounded-lg"
          >
            <Image alt="art-image" src={art.image} width={320} height={320} className="rounded-xl" />
          </Link>
        );
      })}
    </div>
  );
}

/* c8 ignore stop */
