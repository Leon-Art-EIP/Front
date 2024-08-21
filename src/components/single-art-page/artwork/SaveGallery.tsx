"use client";

import { Dispatch, SetStateAction, useState } from "react";
import CreateCollectionForm from "../../../forms/tsx/CreateCollectionForm";
import { ICollectionArtsExtended, INewCollection } from "../../../interfaces/single/collection";
import { myFetch } from "../../../tools/myFetch";
import { Button } from "../../lib";
import Collection from "./Collection";

interface ISaveGalleryProps {
  handleClose(): void;
  collections: ICollectionArtsExtended[];
  selectedCollections: string[];
  setSelectedCollections: Dispatch<SetStateAction<string[]>>;
  artId: string;
  setNewCollectionBody: Dispatch<SetStateAction<string>>;
  isNewCollectionLoading: boolean;
  newCollectionFetchs: number;
  setNewCollectionFetchs: Dispatch<SetStateAction<number>>
}

/* c8 ignore start */

export default function SaveGallery(props: ISaveGalleryProps): JSX.Element {
  const [selectedCollections, setSelectedCollections] = useState<string[]>(props.selectedCollections);
  const [nameNewCollection, setNameNewCollection] = useState<string | undefined>();

  const handleSelectCollection = (id: string) => {
    if (selectedCollections.includes(id)) {
      setSelectedCollections(selectedCollections.filter((collectionId) => collectionId !== id));
    } else {
      setSelectedCollections([...selectedCollections, id]);
    }
  };

  const handleSave = async () => {
    const newCollections = selectedCollections.filter(
      (collectionId) => !props.selectedCollections.includes(collectionId)
    );

    const deletedCollections = props.selectedCollections.filter(
      (collectionId) => !selectedCollections.includes(collectionId)
    );

    await Promise.all([
      Promise.all(
        newCollections.map(async (collectionId) => {
          const collectionName = props.collections.find((collection) => collection._id === collectionId)?.name;
          if (!collectionName) return;

          const response = await myFetch({
            route: "/api/collection",
            method: "POST",
            body: JSON.stringify({
              artPublicationId: props.artId,
              collectionName,
              isPublic: true,
            }),
          });

          if (!response.ok) {
            console.error(`collection add error for collection ${collectionName} and art ${props.artId}`);
          }
        })
      ),
      Promise.all(
        deletedCollections.map(async (collectionId) => {
          const response = await myFetch({
            route: `/api/collection/${collectionId}/remove`,
            method: "PATCH",
            body: JSON.stringify({
              artPublicationIds: [props.artId],
            }),
          });

          if (!response.ok) {
            console.error(`collection remove error for collection ${collectionId} and art ${props.artId}`);
          }
        })
      ),
    ]);

    props.setSelectedCollections(selectedCollections);
    props.handleClose();
  };

  const handleNewCollection = () => {
    if (nameNewCollection === undefined) {
      setNameNewCollection("");
    } else {
      setNameNewCollection(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-7 px-2 pb-2">
      {props.collections.length > 0 ? (
        <>
          <div className="flex flex-row items-center flex-wrap justify-between lg:gap-32 gap-12">
            <button className="text-xl font-medium" onClick={props.handleClose}>
              Annuler
            </button>
            <div className="md:block text-3xl font-bold hidden">Gérer dans mes collections</div>
            <Button
              type="button"
              color="danger"
              id="save-button"
              className="bg-primary rounded-lg px-4 py-2 font-semibold text-xl text-white"
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {props.collections.map((collection) => (
              <Collection
                key={collection._id}
                collection={collection}
                handleSelectCollection={handleSelectCollection}
                selected={selectedCollections.includes(collection._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-2xl font-semibold text-center text-gray-400 p-8">
          Vous n&apos;avez pas encore de collection
        </div>
      )}
      {nameNewCollection === undefined ? (
        <Button color="danger" type="button" className="self-center" onClick={handleNewCollection}>
          Créer une nouvelle collection
        </Button>
      ) : (
        <CreateCollectionForm
          handleClose={handleNewCollection}
          artId={props.artId}
          collectionsNames={props.collections.map((collection) => collection.name)}
          setNewCollectionBody={props.setNewCollectionBody}
          isLoading={false}
          newCollectionFetchs={props.newCollectionFetchs}
          setNewCollectionFetchs={props.setNewCollectionFetchs}
        />
      )}
    </div>
  );
}

/* c8 ignore stop */
