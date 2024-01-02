"use client";

import { ChevronRight, ExpandMore } from "@mui/icons-material";
import IconButton from "../IconButton";
import { ElementType, useState } from "react";
import Image from "next/image";
import { IProfileCollection } from "../../../interfaces/profile/profileCollection";

export interface ICollectionsProps {
  collections: IProfileCollection[];
  link: ElementType<{ children: JSX.Element; href: string }>;
}

export default function Collections({ link: Link, ...props }: ICollectionsProps): JSX.Element {
  const [openCollections, setOpenCollections] = useState<string[]>([]);

  const handleOpenCollectionsOnClick = (collectionId: string) => {
    if (openCollections.includes(collectionId)) {
      setOpenCollections(openCollections.filter((id) => id !== collectionId));
    } else {
      setOpenCollections([...openCollections, collectionId]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {props.collections.map((collection) => (
        <div className="flex flex-col gap-2" key={`collection-profile-${collection.id}`}>
          <div className="flex">
            <div className="font-medium text-xl">{collection.title}</div>
            <IconButton
              text=""
              icon={openCollections.includes(collection.id) ? ChevronRight : ExpandMore}
              onClick={() => handleOpenCollectionsOnClick(collection.id)}
            />
          </div>
          {openCollections.includes(collection.id) &&
            collection.pictures.map((picture) => (
              <Link key={`collection-${collection.id}-art-${picture.id}`} href={`/single/${picture.id}`}>
                <div className="flex flex-wrap gap-2 bg-secondaryGrey">
                  <Image src={picture.src} alt="art-publication" width={200} height={200} />
                </div>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}
