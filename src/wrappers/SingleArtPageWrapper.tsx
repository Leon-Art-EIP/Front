"use client";

import { useEffect, useState } from "react";
import NotFound from "../app/not-found";
import Link from "../components/link/Link";
import LoadingPage from "../components/loading/LoadingPage";
import SingleArtPage from "../components/single-art-page/SingleArtPage";
import { IArtPublication } from "../interfaces/artPublication/artPublication";
import { ICollection, ICollectionArtsExtended, INewCollection } from "../interfaces/single/collection";
import { IProfileUser } from "../interfaces/user/profileUser";
import { IConnectedUser, IUser } from "../interfaces/user/user";
import { IMyFetchResponse, myFetch } from "../tools/myFetch";
import { imageApi } from "../tools/variables";

interface SingleArtPageWrapperProps {
  id: string;
  success: boolean;
  cancel: boolean;
}

export default function SingleArtPageWrapper(props: SingleArtPageWrapperProps): JSX.Element {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [artPublication, setArtPublication] = useState<IArtPublication>();
  const [artist, setArtist] = useState<IProfileUser>();
  const [collectionsArtsExtended, setCollectionsArtsExtended] = useState<ICollectionArtsExtended[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      setUser(localUser.user);
    }

    const getData = async () => {
      try {
        const [collectionsResponse, artPublicationResponse] = await Promise.all([
          myFetch({
            route: "/api/collection/my-collections",
            method: "GET",
          }),
          myFetch({
            route: `/api/art-publication/${props.id}`,
            method: "GET",
          }),
        ]);

        const artPublication: IArtPublication = artPublicationResponse.json;
        setArtPublication(artPublication);

        const collections: ICollection[] = collectionsResponse.json;

        const [collectionsArtsExtended, artistResponse]: [ICollectionArtsExtended[], IMyFetchResponse] =
          await Promise.all([
            Promise.all(
              collections.map(async (collectionArtsExtended) => {
                const artPromises: Promise<IArtPublication | null>[] = collectionArtsExtended.artPublications.map(
                  async (artId) => {
                    const artPublicationsResponse = await myFetch({
                      route: `/api/art-publication/${artId}`,
                      method: "GET",
                    });

                    if (artPublicationsResponse.ok) {
                      const artPublication: IArtPublication = artPublicationsResponse.json;
                      return artPublication;
                    }
                    return null;
                  }
                );

                const artPublications: (IArtPublication | null)[] = await Promise.all(artPromises);

                return {
                  ...collectionArtsExtended,
                  artPublications: artPublications.filter((art) => art !== null) as IArtPublication[],
                };
              })
            ),
            myFetch({
              route: `/api/user/profile/${artPublication.userId}`,
              method: "GET",
            }),
          ]);

        setCollectionsArtsExtended(collectionsArtsExtended);

        const artist: IProfileUser = artistResponse.json;
        setArtist(artist);
      } catch (error) {
        console.error(error);
      }
      setHasLoaded(true);
    };
    getData();
  }, [props.id]);

  if (!user || !artPublication || !artist) {
    if (hasLoaded) {
      return <NotFound />;
    }
    return <LoadingPage />;
  }

  const getCollectionsWithArt = collectionsArtsExtended.filter((collection) =>
    collection.artPublications.find((art) => art._id === artPublication._id)
  );
  const idsOfCollectionsWithArt = getCollectionsWithArt.map((collection) => collection._id);

  const onAddNewCollection = async (collection: INewCollection) => {
    if (collection.collection.artPublications.length > 0) {
      const artPublicationsResponse = await myFetch({
        route: `/api/art-publication/${collection.collection.artPublications[0]}`,
        method: "GET",
      });

      const artPublications: IArtPublication[] = [];

      if (artPublicationsResponse.ok) {
        artPublications.push(artPublicationsResponse.json);
      }

      setCollectionsArtsExtended([
        ...collectionsArtsExtended,
        {
          ...collection.collection,
          artPublications,
        },
      ]);
    }
  };

  return (
    <SingleArtPage
      artistName={artist.username}
      artistId={artist.id}
      description={artPublication.description}
      caracteristics={artPublication.artType}
      price={artPublication.price}
      art={artPublication.image}
      artId={artPublication._id}
      profile={`${imageApi}/${artist.profilePicture}`}
      title={artPublication.name}
      liked={artPublication.likes.find((likeId) => likeId === user.id) ? true : false}
      nbrLikes={artPublication.likes.length}
      collections={collectionsArtsExtended}
      belongingCollectionsIds={idsOfCollectionsWithArt}
      belongingCommands={false} // TODO
      link={Link}
      paymentSuccessful={props.success}
      paymentCanceled={props.cancel}
      connectedUserId={user.id}
      isForSale={artPublication.isForSale}
      isSold={artPublication.isSold}
      onAddNewCollection={onAddNewCollection}
    />
  );
}
