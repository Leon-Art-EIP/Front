"use client";

import { Dispatch, ElementType, SetStateAction, useState } from "react";
import { IProfileArt, IProfileCollection } from "../../../interfaces/profile/profileCollection";
import { ICollectionArtsExtended } from "../../../interfaces/single/collection";
import { Modal } from "../../lib";
import Collection from "../../single-art-page/artwork/Collection";
import Publications from "../publications/Publications";
import InboxIcon from "@mui/icons-material/Inbox";
import Fetcher from "../../fetch/Fetcher";

export interface ICollectionsProps {
  collections: IProfileCollection[];
  link: ElementType<{ children: JSX.Element; href: string }>;
  collectionsArtsExtended: ICollectionArtsExtended[];
  myProfile: boolean;
  setProfileCollections: Dispatch<SetStateAction<IProfileCollection[]>>;
  setCollectionsArtsExtended: Dispatch<SetStateAction<ICollectionArtsExtended[]>>;
}

export default function Collections(props: ICollectionsProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileArts, setProfileArts] = useState<IProfileArt[]>([]);
  const [currentCollectionId, setCurrentCollectionId] = useState("");
  const [nbFetchs, setNbFetchs] = useState(0);

  const handleSelectCollection = (id: string) => {
    setProfileArts(props.collections.find((collection) => collection.id === id)?.pictures ?? []);
    setCurrentCollectionId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCollectionId("");
    setIsModalOpen(false);
  };

  const deleteCollectionOnClick = () => {
    setNbFetchs((prev) => prev + 1);
  };

  const deleteCollectionOnOk = () => {
    props.setProfileCollections(props.collections.filter((collection) => collection.id !== currentCollectionId));
    props.setCollectionsArtsExtended(
      props.collectionsArtsExtended.filter((collection) => collection._id !== currentCollectionId)
    );
    closeModal();
  };

  return (
    <>
      <Fetcher
        method="DELETE"
        nbFetchs={nbFetchs}
        route={`/api/collection/${currentCollectionId}`}
        handleOk={deleteCollectionOnOk}
        successStr="Collection supprimée"
      />
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <Publications
          link={props.link}
          profileArts={profileArts}
          deleteCollectionOnConfirm={props.myProfile ? deleteCollectionOnClick : undefined}
        />
      </Modal>
      {props.collectionsArtsExtended.length > 0 ? (
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
      ) : (
        <div className="w-full flex flex-col justify-center h-full items-center text-2xl">
          <InboxIcon className="text-8xl" />
          <span className="text-2xl">Aucune collection</span>
        </div>
      )}
    </>
  );
}
