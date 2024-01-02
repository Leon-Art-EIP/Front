import { ElementType } from "react";
import { IProfileArt } from "../../../interfaces/profile/profileCollection";
import Image from "next/image";

interface IPublicationsProps {
  profileArts: IProfileArt[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Publications({ link: Link, ...props }: IPublicationsProps): JSX.Element {
  if (props.profileArts.length === 0) {
    return <div className="text-2xl">Aucune publication</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 bg-secondaryGrey p-4 rounded">
      {props.profileArts.map((picture) => (
        <Link key={`art-${picture.id}`} href={`/single/${picture.id}`}>
          <Image src={picture.src} alt="art-publication" width={300} height={300} className="rounded" />
        </Link>
      ))}
    </div>
  );
}
