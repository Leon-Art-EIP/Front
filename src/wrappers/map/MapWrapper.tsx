"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ShareLocalisation from "../../components/localisation/ShareLocalisation";
import Map from "../../components/map/Map";
import MapProvider from "../../providers/MapProvider";
import { IConnectedUser, IUser } from "../../interfaces/user/user";
import { CircularProgress } from "@mui/material";
import { myFetch } from "../../tools/myFetch";
import { IProfileUser } from "../../interfaces/user/profileUser";

export interface ICoords {
  latitude: string;
  longitude: string;
}

interface IMapWrapperProps {
  coords: ICoords | undefined;
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
        latitude: user.location.coordinates[0],
        longitude: user.location.coordinates[1],
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

  useEffect(() => {
    const local = localStorage.getItem("user");

    if (local) {
      const localUser = JSON.parse(local) as IConnectedUser;
      fetchUserCoords(localUser.user.id, setUserCoords);
    } else {
      setUserCoords(null);
    }
  }, []);

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

  return (
    <div className="flex flex-col gap-4">
      <MapProvider>
        <Map mapCenter={mapCenter} />
      </MapProvider>
      {!userCoords && <ShareLocalisation color="primary" className="self-center" />}
    </div>
  );
}
