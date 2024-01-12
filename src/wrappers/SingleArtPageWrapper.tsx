"use client";

import { useEffect, useState } from "react";
import Link from "../components/link/Link";
import SingleArtPage from "../components/single-art-page/SingleArtPage";
import fakeData from "../components/single-art-page/fakeData";
import { IUser } from "../interfaces/user/user";
import { myFetch } from "../tools/myFetch";
import { IArtPublication } from "../interfaces/artPublication/artPublication";
import { IProfileUser } from "../interfaces/user/profileUser";
import LoadingPage from "../components/loading/LoadingPage";
import { imageApi } from "../tools/variables";
import { ICollection, ICollectionArtsExtended } from "../interfaces/single/collection";

export default function SingleArtPageWrapper(props: { params: { id: string } }): JSX.Element {
  const [artPublication, setArtPublication] = useState<IArtPublication>();
  const [artist, setArtist] = useState<IProfileUser>();
  const [collectionsArtsExtended, setCollectionsArtsExtended] = useState<ICollectionArtsExtended[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [collectionsResponse, artPublicationResponse] = await Promise.all([
          myFetch({
            route: "/api/collection/my-collections",
            method: "GET",
          }),
          myFetch({
            route: `/api/art-publication/${props.params.id}`,
            method: "GET",
          }),
        ]);

        const artPublication: IArtPublication = await artPublicationResponse.json();
        setArtPublication(artPublication);

        const collections: ICollection[] = await collectionsResponse.json();

        const [collectionsArtsExtended, artistResponse]: [ICollectionArtsExtended[], Response] = await Promise.all([
          Promise.all(
            collections.map(async (collectionArtsExtended) => {
              const artPromises: Promise<IArtPublication | null>[] = collectionArtsExtended.artPublications.map(
                async (artId) => {
                  const artPublicationsResponse = await myFetch({
                    route: `/api/art-publication/${artId}`,
                    method: "GET",
                  });

                  if (artPublicationsResponse.ok) {
                    const artPublication: IArtPublication = await artPublicationsResponse.json();
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

        const artist: IProfileUser = await artistResponse.json();
        setArtist(artist);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [props.params.id]);

  const user: IUser | undefined = JSON.parse(localStorage.getItem("user") || "").user;

  if (!user || !artPublication || !artist) {
    return <LoadingPage />;
  }

  const data = fakeData;

  return (
    <SingleArtPage
      artistName={artist.username}
      artistId={artist._id}
      description={artPublication.description}
      caracteristics={artPublication.artType}
      price={artPublication.price}
      art={artPublication.image}
      artId={artPublication._id}
      profile={`${imageApi}/${artist.profilePicture}`}
      title={artPublication.name}
      liked={artPublication.likes.find((like) => like._id === user.id) ? true : false}
      nbrLikes={artPublication.likes.length}
      collections={collectionsArtsExtended}
      belongingCollections={data.belongingCollections}
      belongingCommands={data.belongingCommands}
      link={Link}
    />
  );
}
