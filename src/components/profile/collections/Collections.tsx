"use client";

import { Dispatch, ElementType, SetStateAction, useState } from "react";
import { IProfileArt, IProfileCollection } from "../../../interfaces/profile/profileCollection";
import { ICollectionArtsExtended } from "../../../interfaces/single/collection";
import { Modal } from "../../lib";
import Collection from "../../single-art-page/artwork/Collection";
import Publications from "../publications/Publications";
import { myFetch } from "../../../tools/myFetch";
import InboxIcon from "@mui/icons-material/Inbox";

export interface ICollectionsProps {
  collections: IProfileCollection[];
  link: ElementType<{ children: JSX.Element; href: string }>;
  collectionsArtsExtended: ICollectionArtsExtended[];
  setProfileCollections: Dispatch<SetStateAction<IProfileCollection[]>>;
  setCollectionsArtsExtended: Dispatch<SetStateAction<ICollectionArtsExtended[]>>;
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileArts, setProfileArts] = useState<IProfileArt[]>([]);
  const [currentCollectionId, setCurrentCollectionId] = useState("");

  const handleSelectCollection = (id: string) => {
    setProfileArts(props.collections.find((collection) => collection.id === id)?.pictures ?? []);
    setCurrentCollectionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCollectionId("");
    setIsModalOpen(false);
  };

  const deleteCollectionOnClick = async () => {
    if (currentCollectionId) {
      const response = await myFetch({
        route: `/api/collection/${currentCollectionId}`,
        method: "DELETE",
      });

      if (response.ok) {
        props.setProfileCollections(props.collections.filter((collection) => collection.id !== currentCollectionId));
        props.setCollectionsArtsExtended(
          props.collectionsArtsExtended.filter((collection) => collection._id !== currentCollectionId)
        );
      }
      closeModal();
    }
  };

  if (props.collectionsArtsExtended.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center h-full items-center text-2xl">
        <InboxIcon className="text-8xl" />
        <span className="text-2xl">Aucune collection</span>
      </div>
    );
  }

  return (
    <>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <Publications link={props.link} profileArts={profileArts} deleteCollectionOnClick={deleteCollectionOnClick} />
      </Modal>
      <div className="flex flex-wrap gap-6">
        {props.collectionsArtsExtended.map((collection) => (
          <Collection
            key={collection._id}
            collection={collection}
            handleSelectCollection={handleSelectCollection}
            selected={false}
          />
        ))}
      </div>
    </>
  );
}
