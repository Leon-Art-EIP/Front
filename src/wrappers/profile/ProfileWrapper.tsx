"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import banner from "../../assets/profileBanner.png";
import Link from "../../components/link/Link";
import LoadingPage from "../../components/loading/LoadingPage";
import Heading from "../../components/profile/heading/Heading";
import Infos from "../../components/profile/infos/Infos";
import ProfileHeadingForm from "../../forms/tsx/ProfileHeadingForm";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { IArtist } from "../../interfaces/home/artist";
import { IProfileArt, IProfileCollection } from "../../interfaces/profile/profileCollection";
import { ICollection, ICollectionArtsExtended } from "../../interfaces/single/collection";
import { IConnectedUser, IUser } from "../../interfaces/user/user";
import { myFetch } from "../../tools/myFetch";
import { imageApi } from "../../tools/variables";
import TabsWrapper from "./TabsWrapper";

interface IProfileWrapperProps {
  id: string;
}

export default function ProfileWrapper(props: IProfileWrapperProps): JSX.Element {
  const user: IConnectedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const myProfile = Object.keys(user).length > 0 && user.user.id === props.id;
  const ProfileComponent = myProfile ? ProfileHeadingForm : Heading;
  const [artist, setArtist] = useState<IArtist | null>(null);
  const [profileCollections, setProfileCollections] = useState<IProfileCollection[]>([]);
  const [collectionsArtsExtended, setCollectionsArtsExtended] = useState<ICollectionArtsExtended[]>([]);
  const [publications, setPublications] = useState<IProfileArt[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [followed, setFollowed] = useState<IUser[]>([]);
  const [averageRating, setAverageRating] = useState<number>(-1);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUnauthorized = () => {
      router.push("/login");
    };

    const fetchData = async () => {
      const response = await myFetch({ route: `/api/user/profile/${props.id}`, method: "GET", handleUnauthorized });
      const artist = response.json as IArtist;
      setArtist(artist);

      async function fetchPublicationsForCollection(collection: ICollection): Promise<IProfileCollection> {
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

      async function fetchCollectionsWithPublications(): Promise<{
        profileCollections: IProfileCollection[];
        collections: ICollection[];
      }> {
        const response = await myFetch({ route: `/api/collection/user/${props.id}/collections`, method: "GET" });
        const collections = response.json as ICollection[];

        const profileCollections = await Promise.all(
          collections.map((collection) => fetchPublicationsForCollection(collection))
        );
        return {
          profileCollections,
          collections,
        };
      }

      async function fetchPublications(): Promise<IProfileArt[]> {
        const response = await myFetch({ route: `/api/art-publication/user/${props.id}`, method: "GET" });
        if (response.ok) {
          const arts = response.json as IArtPublication[];

          const publications = arts.map((art) => ({
            id: art._id,
            src: `${imageApi}/${art.image}`,
          }));
          return publications;
        }
        return [];
      }

      async function fetchCollectionsArtsExtended(collections: ICollection[]): Promise<ICollectionArtsExtended[]> {
        const collectionsArtsExtended = await Promise.all(
          collections.map(async (collection) => {
            const artPromises: Promise<IArtPublication | null>[] = collection.artPublications.map(async (artId) => {
              const artPublicationsResponse = await myFetch({
                route: `/api/art-publication/${artId}`,
                method: "GET",
              });

              if (artPublicationsResponse.ok) {
                const artPublication: IArtPublication = artPublicationsResponse.json;
                return artPublication;
              }
              return null;
            });

            const artPublications: (IArtPublication | null)[] = await Promise.all(artPromises);

            return {
              ...collection,
              artPublications: artPublications.filter((art) => art !== null) as IArtPublication[],
            };
          })
        );
        return collectionsArtsExtended;
      }

      async function fetchFollowers(): Promise<IUser[]> {
        const response = await myFetch({ route: `/api/follow/followers`, method: "GET" });
        if (response.ok) {
          const data = response.json;
          // Transform the data to match IUser interface
          return data.subscribers.map((follower: any) => ({
            id: follower._id,
            username: follower.username,
            email: follower.email,
            is_artist: follower.is_artist,
            availability: follower.availability,
            subscription: follower.subscription,
            collections: follower.collections,
          })) as IUser[];
        }
        return [];
      }

      async function fetchAverageRating(userId: string): Promise<number> {
        const response = await myFetch({ route: `/api/order/user/${userId}/average-rating`, method: "GET" });
        if (response.ok) {
          return response.json.averageRating;
        }
        return -1;
      }

      async function fetchFollowed(): Promise<IUser[]> {
        const response = await myFetch({ route: `/api/follow/following`, method: "GET" });
        if (response.ok) {
          const data = response.json;
          // Transform the data to match IUser interface
          return data.subscriptions.map((followed: any) => ({
            id: followed._id,
            username: followed.username,
            email: followed.email,
            is_artist: followed.is_artist,
            availability: followed.availability,
            subscription: followed.subscription,
            collections: followed.collections,
          })) as IUser[];
        }
        return [];
      }

      const fetchedAverageRating = await fetchAverageRating(props.id);
      setAverageRating(fetchedAverageRating);
      const fetchedFollowers: IUser[] = await fetchFollowers();
      setFollowers(fetchedFollowers);
      const fetchedFollowed: IUser[] = await fetchFollowed();
      setFollowed(fetchedFollowed);
      const { profileCollections, collections } = await fetchCollectionsWithPublications();
      setProfileCollections(profileCollections);
      const publications: IProfileArt[] = await fetchPublications();
      setPublications(publications);
      const collectionsArtsExtended = await fetchCollectionsArtsExtended(collections);
      setCollectionsArtsExtended(collectionsArtsExtended);
      setLoading(false);
    };
    fetchData();
  }, [props.id, router]);

  if (!artist || loading) return <LoadingPage />;

  return (
    <div className="flex flex-col">
      <ProfileComponent
        profilePicture={`${imageApi}/${artist.profilePicture}`}
        banner={artist.bannerPicture.includes("default") ? banner : `${imageApi}/${artist.bannerPicture}`}
      />
      <div className="flex lg:flex-row flex-col-reverse bg-background">
        <div className="flex-1 flex flex-col gap-2 p-4">
          <TabsWrapper
            aboutTitle="Bienvenue dans mon espace créatif"
            aboutDescription={artist.biography}
            collections={profileCollections}
            collectionsArtsExtended={collectionsArtsExtended}
            publications={publications}
            myProfile={myProfile}
            link={Link}
          />
        </div>
        <div className="flex justify-center">
          <Infos
            availability={artist.availability}
            artistName={artist.username}
            numberOfFollowers={artist.subscribersCount}
            followers={followers}
            followed={followed}
            averageRating={averageRating}
            numberOfPosts={publications.length}
            myProfile={myProfile}
            following={Object.keys(user).length > 0 && artist.subscribers.includes(user.user.id)}
            id={props.id}
            connectedUserId={user.user.id}
            link={Link}
          />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
