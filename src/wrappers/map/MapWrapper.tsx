"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import ShareLocalisation from "../../components/localisation/ShareLocalisation";
import Map from "../../components/map/Map";
import MapProvider from "../../providers/MapProvider";
import { IConnectedUser, IUser } from "../../interfaces/user/user";
import { CircularProgress } from "@mui/material";
import { myFetch } from "../../tools/myFetch";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { ILocatedMapUser, IMapUser } from "../../interfaces/map";
import { positionToCoords } from "../../tools/positions";
import SwitchLocalisation from "../../components/localisation/SwitchLocalisation";
import { IArtPublication } from "../../interfaces/artPublication/artPublication";
import { useRouter } from "next/navigation";

export const defaultMapCenter = {
  // milieu France
  lat: 47.81,
  lng: 2.308,
};

export interface ICoords {
  latitude: string;
  longitude: string;
}

interface IMapWrapperProps {
  coords: ICoords | undefined;
}

async function fetchLocatedMapUsers(
  userPosition: ICoords,
  setLocatedMapUsers: Dispatch<SetStateAction<ILocatedMapUser[]>>,
  handleUnauthorized?: () => void
) {
  const response = await myFetch({
    method: "GET",
    route: `/api/map/nearby-art?latitude=${userPosition.latitude}&longitude=${userPosition.longitude}&radius=10000`,
    handleUnauthorized,
  });

  if (response.ok) {
    const users: IMapUser[] = response.json as IMapUser[];

    const userPromises = users.map(async (user) => {
      const response = await myFetch({
        method: "GET",
        route: `/api/user/profile/${user._id}`,
      });

      if (response.ok) {
        const profileUser: IProfileUser = response.json as IProfileUser;

        if (
          profileUser.location &&
          "coordinates" in profileUser.location &&
          profileUser.location.coordinates &&
          profileUser.location.coordinates.length === 2
        ) {
          const lat: number = Number(profileUser.location.coordinates[1]);
          const lng: number = Number(profileUser.location.coordinates[0]);

          if (!isNaN(lat) && !isNaN(lng)) {
            return {
              _id: user._id,
              username: user.username,
              profilePicture: user.profilePicture,
              position: {
                lat,
                lng,
              },
            };
          }
        }
      }
      return null;
    });

    const locatedUsers = (await Promise.all(userPromises)).filter((user): user is ILocatedMapUser => user !== null);

    setLocatedMapUsers(locatedUsers);
  }
}

async function fetchMapUser(
  user: IUser,
  setMapUser: Dispatch<SetStateAction<ILocatedMapUser | null | undefined>>,
  setNbPublications: Dispatch<SetStateAction<number>>
) {
  const [response, responsePublications] = await Promise.all([
    myFetch({
      method: "GET",
      route: `/api/user/profile/${user.id}`,
    }),
    myFetch({ route: `/api/art-publication/user/${user.id}`, method: "GET" }),
  ]);

  let nbPublications = 0;

  if (responsePublications.ok) {
    const arts = responsePublications.json as IArtPublication[];

    nbPublications = arts.length;

    setNbPublications(arts.length);
  }

  if (response.ok && nbPublications > 0) {
    const user = response.json as IProfileUser;

    if (
      user.location &&
      "coordinates" in user.location &&
      user.location.coordinates &&
      user.location.coordinates.length == 2
    ) {
      setMapUser({
        position: {
          lat: Number(user.location.coordinates[1]),
          lng: Number(user.location.coordinates[0]),
        },
        _id: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
      });
    } else {
      setMapUser(null);
    }
  } else {
    setMapUser(null);
  }
}

export default function MapWrapper(props: IMapWrapperProps): JSX.Element {
  const router = useRouter();

  const [localUser, setLocalUser] = useState<IUser | null>(null);
  const [locatedMapUser, setLocatedMapUser] = useState<ILocatedMapUser | undefined | null>(undefined);
  const [locatedMapUsers, setLocatedMapUsers] = useState<ILocatedMapUser[]>([]);
  const [nbPublications, setNbPublications] = useState<number>(0);

  const mapCenter = useMemo(() => {
    if (props.coords) {
      const lat = Number(props.coords.latitude);
      const lng = Number(props.coords.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        return {
          lat,
          lng,
        };
      }
    }

    if (locatedMapUser) {
      return locatedMapUser.position;
    }
  }, [locatedMapUser, props.coords]);

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      setLocalUser(localUser.user);
      fetchMapUser(localUser.user, setLocatedMapUser, setNbPublications);
    } else {
      setLocatedMapUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (locatedMapUser) {
      fetchLocatedMapUsers(positionToCoords(locatedMapUser.position), setLocatedMapUsers);
    }
  }, [locatedMapUser]);

  useEffect(() => {
    const handleUnauthorized = () => {
      router.push("/login");
    };

    if (mapCenter) {
      fetchLocatedMapUsers(positionToCoords(mapCenter), setLocatedMapUsers, handleUnauthorized);
    } else {
      fetchLocatedMapUsers(positionToCoords(defaultMapCenter), setLocatedMapUsers, handleUnauthorized);
    }
  }, [mapCenter, router]);

  if (locatedMapUser === undefined) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <CircularProgress size={40} thickness={4} color="primary" className="self-center" />
      </div>
    );
  }

  const onRefreshCoords = () => {
    if (localUser) {
      fetchMapUser(localUser, setLocatedMapUser, setNbPublications);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <MapProvider>
        <Map mapCenter={mapCenter} locatedMapUsers={locatedMapUsers} mapZoom={mapCenter ? 14 : undefined} />
      </MapProvider>

      {nbPublications > 0 ? (
        <>
          {locatedMapUser ? (
            <SwitchLocalisation
              color="primary"
              className="self-center"
              positionShared
              onRefreshCoords={onRefreshCoords}
            />
          ) : (
            <SwitchLocalisation color="primary" className="self-center" onRefreshCoords={onRefreshCoords} />
          )}
        </>
      ) : (
        <p className="text-center">Créez au moins une publication si vous souhaitez partager votre localisation</p>
      )}
    </div>
  );
}
