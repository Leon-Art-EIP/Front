import { ElementType, useState } from "react";
import { IProfileArt } from "../../../interfaces/profile/profileCollection";
import { Button } from "../../lib";
import { cn } from "../../../tools/cn";
import InboxIcon from "@mui/icons-material/Inbox";

interface IPublicationsProps {
  profileArts: IProfileArt[];
  link: ElementType<{ children: JSX.Element; href: string }>;
  deleteCollectionOnConfirm?: () => void;
}

export default function Publications({ link: Link, ...props }: IPublicationsProps): JSX.Element {
  const [isDeletingCollection, setIsDeletingCollection] = useState(false);

  const deleteCollectionOnClick = () => {
    setIsDeletingCollection(true);
  };

  const onCancelDeleteCollection = () => {
    setIsDeletingCollection(false);
  };

  return (
    <>
      {props.profileArts.length > 0 ? (
        <div
          className={cn(
            "w-full flex flex-col bg-background-hl p-4 rounded gap-4",
            props.deleteCollectionOnConfirm && "items-center justify-center"
          )}
        >
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

          {props.deleteCollectionOnConfirm &&
            (isDeletingCollection ? (
              <div className="flex flex-col gap-2 items-center">
                <h2>Êtes-vous sûr ?</h2>
                <div className="flex gap-2">
                  <Button color="primary" type="button" onClick={props.deleteCollectionOnConfirm}>
                    Confirmer
                  </Button>
                  <Button color="secondary" type="button" onClick={onCancelDeleteCollection}>
                    Annuler
                  </Button>
                </div>
              </div>
            ) : (
              <Button color="primary" type="button" onClick={deleteCollectionOnClick}>
                Supprimer la collection
              </Button>
            ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center h-full items-center text-2xl">
          <InboxIcon className="text-8xl" />
          <span className="text-2xl">Aucune publication</span>
        </div>
      )}
    </>
  );
}
