"use client";

import { useEffect, useState } from "react";
import Link from "../../components/link/Link";
import { TCategory } from "../../components/profile/category/Category";
import Infos from "../../components/profile/infos/Infos";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { IArtist } from "../../interfaces/home/artist";
import { IProfileArt, IProfileCollection } from "../../interfaces/profile/profileCollection";
import { IUserCollection } from "../../interfaces/profile/userCollection";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import TabsWrapper from "./TabsWrapper";
import LoadingPage from "../../components/loading/LoadingPage";
import banner from "../../assets/profileBanner.png";
import { IConnectedUser } from "../../interfaces/user/user";
import ProfileHeadingForm from "../../forms/tsx/ProfileHeadingForm";
import Heading from "../../components/profile/heading/Heading";

interface IProfileWrapperProps {
  id: string;
}

export default function ProfileWrapper(props: IProfileWrapperProps): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const myProfile = Object.keys(user).length > 0 && user.user.id === props.id;
  const ProfileComponent = myProfile ? ProfileHeadingForm : Heading;
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [collections, setCollections] = useState<IProfileCollection[]>([]);
  const [publications, setPublications] = useState<IProfileArt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await myFetch({ route: `/api/user/profile/${props.id}`, method: "GET" });
      const artist = response.json as IArtist;
      setArtist(artist);

      async function fetchPublicationsForCollection(collection: IUserCollection): Promise<IProfileCollection> {
        const response = await myFetch({ route: `/api/collection/${collection._id}/publications`, method: "GET" });
        const arts = response.json as IArtPublication[];
        const pictures: IProfileArt[] = arts.map((art) => ({
          id: art._id,
          src: `${imageApi}/${art.image}`,
        }));
        return {
          id: collection._id,
          title: collection.name,
          pictures,
        };
      }

      async function fetchCollectionsWithPublications(): Promise<IProfileCollection[]> {
        const response = await myFetch({ route: `/api/collection/user/${props.id}/collections`, method: "GET" });
        const collections = response.json as IUserCollection[];

        const profileCollections = await Promise.all(
          collections.map((collection) => fetchPublicationsForCollection(collection))
        );
        return profileCollections;
      }

      async function fetchPublications(): Promise<IProfileArt[]> {
        const response = await myFetch({ route: `/api/art-publication/user/${props.id}`, method: "GET" });
        const arts = response.json as IArtPublication[];

        const publications = arts.map((art) => ({
          id: art._id,
          src: `${imageApi}/${art.image}`,
        }));
        return publications;
      }

      const collections: IProfileCollection[] = await fetchCollectionsWithPublications();
      setCollections(collections);
      const publications: IProfileArt[] = await fetchPublications();
      setPublications(publications);
    };
    fetchData();
  }, [props.id]);

  const data: {
    aboutTitle: string;
    artType: string;
    categories: TCategory[];
  } = {
    aboutTitle: "Bienvenue dans mon espace créatif",
    artType: "Designer graphique",
    categories: ["Huile", "Aquarelle", "Acrylique", "Gouache", "Tempéra", "Fresque", "Crayon"],
  };

  if (!artist) return <LoadingPage />;

  return (
    <div className="flex flex-col">
      <ProfileComponent
        profilePicture={`${imageApi}/${artist.profilePicture}`}
        banner={artist.bannerPicture.includes("default") ? banner : `${imageApi}/${artist.bannerPicture}`}
      />
      <div className="grid grid-cols-4 bg-white">
        <div className="flex flex-col col-span-3 gap-2 p-4">
          <TabsWrapper
            aboutTitle={data.aboutTitle} // TODO: ask backend to send this
            aboutDescription={artist.biography}
            collections={collections}
            publications={publications}
            myProfile={myProfile}
            link={Link}
          />
        </div>
        <div className="flex justify-center">
          <Infos
            availability={artist.availability}
            artType={data.artType} // TODO: ask backend to send this
            artistName={artist.username}
            categories={data.categories} // TODO: ask backend to send this
            numberOfFollowers={artist.subscribersCount}
            numberOfPosts={publications.length}
            myProfile={myProfile}
            following={Object.keys(user).length > 0 && artist.subscribers.includes(user.user.id)}
            id={props.id}
            connectedUserId={user.user.id}
            link={Link}
          />
        </div>
      </div>
    </div>
  );
}
