import { Dispatch, ElementType, SetStateAction } from "react";
import { IProfileArt, IProfileCollection } from "../../../interfaces/profile/profileCollection";
import { Button } from "../../lib";
import { cn } from "../../../tools/cn";
import { myFetch } from "../../../tools/myFetch";
import { ICollectionArtsExtended } from "../../../interfaces/single/collection";

interface IPublicationsProps {
  profileArts: IProfileArt[];
  link: ElementType<{ children: JSX.Element; href: string }>;
  deleteCollectionOnClick?: () => Promise<void>;
}

export default function Publications({ link: Link, ...props }: IPublicationsProps): JSX.Element {
  return (
    <div
      className={cn(
        "w-full flex flex-col bg-background-hl p-4 rounded gap-4",
        props.deleteCollectionOnClick && "items-center justify-center"
      )}
    >
      {props.profileArts.length > 0 ? (
        <div className="flex flex-wrap gap-4">
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
      ) : (
        <div className="text-2xl">Aucune publication</div>
      )}
      {props.deleteCollectionOnClick && (
        <Button color="primary" type="button" onClick={props.deleteCollectionOnClick}>
          Supprimer la collection
        </Button>
      )}
    </div>
  );
}
