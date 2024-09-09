"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShareLocalisation from "../../components/localisation/ShareLocalisation";
import Map from "../../components/map/Map";
import MapProvider from "../../providers/MapProvider";
import { IConnectedUser, IUser } from "../../interfaces/user/user";
import { CircularProgress } from "@mui/material";
import { myFetch } from "../../tools/myFetch";
import { IProfileUser } from "../../interfaces/user/profileUser";
import { ILocatedMapUser, IMapUser } from "../../interfaces/map";

export interface ICoords {
  latitude: string;
  longitude: string;
}

interface IMapWrapperProps {
  coords: ICoords | undefined;
}

async function fetchLocatedMapUsers(
  userPosition: ICoords,
  setLocatedMapUsers: Dispatch<SetStateAction<ILocatedMapUser[]>>
) {
  const response = await myFetch({
    method: "GET",
    route: "/api/map/nearby-art",
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

        if (profileUser.location && profileUser.location.coordinates.length === 2) {
          const lat: number = Number(profileUser.location.coordinates[1]);
          const lng: number = Number(profileUser.location.coordinates[0]);

          if (!isNaN(lat) && !isNaN(lng)) {
            return {
              _id: user._id,
              username: user.username,
              profilePicture: user.profilePicture,
              position: { lat, lng },
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

async function fetchUserCoords(userId: string, setUserCoords: Dispatch<SetStateAction<ICoords | null | undefined>>) {
  const response = await myFetch({
    method: "GET",
    route: `/api/user/profile/${userId}`,
  });

  if (response.ok) {
    const user = response.json as IProfileUser;

    if (user.location && user.location.coordinates.length == 2) {
      setUserCoords({
        latitude: user.location.coordinates[1],
        longitude: user.location.coordinates[0],
      });
    } else {
      setUserCoords(null);
    }
  } else {
    setUserCoords(null);
  }
}

export default function MapWrapper(props: IMapWrapperProps): JSX.Element {
  const [userCoords, setUserCoords] = useState<ICoords | undefined | null>(undefined);
  const [locatedMapUsers, setLocatedMapUsers] = useState<ILocatedMapUser[]>([]);

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      fetchUserCoords(localUser.user.id, setUserCoords).then(() => {
        if (userCoords) {
          fetchLocatedMapUsers(userCoords, setLocatedMapUsers);
        }
      });
    } else {
      setUserCoords(null);
    }
  }, [userCoords]);

  if (userCoords === undefined) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <CircularProgress size={40} thickness={4} color="primary" className="self-center" />
      </div>
    );
  }

  const mapCenter = props.coords
    ? {
        lat: parseFloat(props.coords.latitude),
        lng: parseFloat(props.coords.longitude),
      }
    : undefined;

  const markerCoords = userCoords
    ? {
        lat: parseFloat(userCoords.latitude),
        lng: parseFloat(userCoords.longitude),
      }
    : undefined;

  const onRefreshCoords = (position: ICoords) => {
    setUserCoords(position);
    fetchLocatedMapUsers(position, setLocatedMapUsers);
  };

  return (
    <div className="flex flex-col gap-4">
      <MapProvider>
        <Map mapCenter={mapCenter} locatedMapUsers={locatedMapUsers} />
      </MapProvider>
      {userCoords ? (
        <ShareLocalisation color="primary" className="self-center" refresh onRefreshCoords={onRefreshCoords} />
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm">Si vous souhaitez voir les artistes autour de vous, partagez votre localisation</p>
          <ShareLocalisation color="primary" className="self-center" onRefreshCoords={onRefreshCoords} />
        </div>
      )}
    </div>
  );
}
