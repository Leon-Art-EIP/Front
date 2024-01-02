import { ElementType } from "react";
import { IProfileArt } from "../../../interfaces/profile/profileCollection";
import Image from "next/image";

interface IPublicationsProps {
  profileArts: IProfileArt[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Publications({ link: Link, ...props }: IPublicationsProps): JSX.Element {
  return (
    <>
      {props.profileArts.map((picture) => (
        <Link key={`art-${picture.id}`} href={`/single/${picture.id}`}>
          <div className="flex flex-wrap gap-2 bg-secondaryGrey">
            <Image src={picture.src} alt="art-publication" width={200} height={200} />
          </div>
        </Link>
      ))}
    </>
  );
}
