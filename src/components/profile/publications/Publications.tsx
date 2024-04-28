import { ElementType } from "react";
import { IProfileArt } from "../../../interfaces/profile/profileCollection";

interface IPublicationsProps {
  profileArts: IProfileArt[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Publications({ link: Link, ...props }: IPublicationsProps): JSX.Element {
  if (props.profileArts.length === 0) {
    return <div className="text-2xl">Aucune publication</div>;
  }

  return (
    <div className="w-full flex justify-center bg-background-hl p-4 rounded">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mx-auto">
        {props.profileArts.map((picture) => (
          <Link
            key={`art-${picture.id}`}
            href={`/single/${picture.id}`}
            className="2xl:w-64 2xl:h-64 xl:w-56 xl:h-56 md:w-44 md:h-44 w-36 h-36 rounded-xl overflow-hidden hover:scale-[1.03] hover:opacity-75 duration-300 hover:shadow-2xl transition ease-in-out cursor-pointer"
          >
            <img src={picture.src} alt="art" className="w-full h-full object-cover object-center" />
          </Link>
        ))}
      </div>
    </div>
  );
}
