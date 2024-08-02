"use client";

import { ElementType, useState } from "react";
import { IProfileArt, IProfileCollection } from "../../../interfaces/profile/profileCollection";
import { ICollectionArtsExtended } from "../../../interfaces/single/collection";
import { Modal } from "../../lib";
import Collection from "../../single-art-page/artwork/Collection";
import Publications from "../publications/Publications";

export interface ICollectionsProps {
  collections: IProfileCollection[];
  link: ElementType<{ children: JSX.Element; href: string }>;
  collectionsArtsExtended: ICollectionArtsExtended[];
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileArts, setProfileArts] = useState<IProfileArt[]>([]);

  const handleSelectCollection = (id: string) => {
    setProfileArts(props.collections.find((collection) => collection.id === id)?.pictures ?? []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (props.collections.length === 0) {
    return <div className="text-2xl">Aucune collection</div>;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <Publications link={props.link} profileArts={profileArts} />
      </Modal>
      <div className="flex flex-wrap gap-6">
        {props.collectionsArtsExtended.map((collection) => (
          <Collection
            key={collection.id}
            collection={collection}
            handleSelectCollection={handleSelectCollection}
            selected={false}
          />
        ))}
      </div>
    </>
  );
}
