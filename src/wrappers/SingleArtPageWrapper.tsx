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

export default function SingleArtPageWrapper(props: { params: { id: string } }): JSX.Element {
  const [artPublication, setArtPublication] = useState<IArtPublication>();
  const [artist, setArtist] = useState<IProfileUser>();

  useEffect(() => {
    const getData = async () => {
      const artPublicationResponse = await myFetch({
        route: `/api/art-publication/${props.params.id}`,
        method: "GET",
      });

      const artPublication: IArtPublication = await artPublicationResponse.json();
      setArtPublication(artPublication);

      const artistResponse = await myFetch({
        route: `/api/user/profile/${artPublication.userId}`,
        method: "GET",
      });

      const artist: IProfileUser = await artistResponse.json();
      setArtist(artist);
    };
    getData();
  }, [props.params.id]);

  const user: IUser | undefined = JSON.parse(localStorage.getItem("user") || "");

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
      art={data.art}
      artId={artPublication._id}
      profile={data.profile}
      title={artPublication.name}
      liked={artPublication.likes.includes(user.id)}
      nbrLikes={artPublication.likes.length}
      collections={data.collections}
      belongingCollections={data.belongingCollections}
      belongingCommands={data.belongingCommands}
      link={Link}
    />
  );
}
