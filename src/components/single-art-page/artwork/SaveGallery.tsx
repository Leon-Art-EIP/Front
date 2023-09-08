import Collections, { ICollectionsProps, TCollection } from "./Collections";
import { Dispatch, SetStateAction, useState } from "react";

interface ISaveGalleryProps {
  handleClose(): void;
  collections: TCollection[];
  belongingCollections: number[];
  selectedCollections: number[];
  setSelectedCollections: Dispatch<SetStateAction<number[]>>;
}

export default function SaveGallery(props: ISaveGalleryProps): JSX.Element {
  const handleSelectCollection = (id: number) => {
    if (props.selectedCollections.includes(id)) {
      props.setSelectedCollections(props.selectedCollections.filter((collectionId) => collectionId !== id));
    } else {
      props.setSelectedCollections([...props.selectedCollections, id]);
    }
  };

  const handleSave = () => {
    console.log("oeuvre ajoutée aux collections : ", props.selectedCollections); // TODO: send to backend
    props.handleClose();
  };

  return (
    <div className="flex flex-col gap-7 px-2 pb-2">
      <div className="flex flex-row justify-between items-center flex-wrap gap-4">
        <button className="text-xl font-medium" onClick={props.handleClose}>
          Annuler
        </button>
        <div className="md:block text-3xl font-bold hidden">Enregistrer dans les galeries</div>
        <button className="bg-primaryRed rounded-lg px-4 py-2 font-semibold text-xl text-white" onClick={handleSave}>
          Terminer
        </button>
      </div>
      <Collections
        collections={props.collections}
        selectedCollections={props.selectedCollections}
        handleSelectCollection={handleSelectCollection}
      />
    </div>
  );
}
