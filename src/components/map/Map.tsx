import { useState, useRef } from "react";
import { GoogleMap, InfoWindow, InfoWindowF, MarkerF } from "@react-google-maps/api";
import Link from "next/link";
import { ILocatedMapUser } from "../../interfaces/map";
import { imageApi } from "../../tools/variables";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "0px 0px 0px 0px",
};

const defaultMapCenter = {
  lat: 48.683331,
  lng: 6.2,
};

const defaultMapZoom = 13;

const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

interface IMapProps {
  mapCenter?: google.maps.LatLngLiteral;
  mapZoom?: number;
  locatedMapUsers: ILocatedMapUser[];
}

export default function Map(props: IMapProps): JSX.Element {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onMarkerHover = (userId: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveUserId(userId);
  };

  const onMarkerLeave = () => {
    // Définir un délai avant de cacher l'InfoWindow
    timerRef.current = setTimeout(() => {
      setActiveUserId(null);
    }, 300);
  };

  const onInfoWindowEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const onInfoWindowLeave = () => {
    setActiveUserId(null);
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={props.mapCenter ?? defaultMapCenter}
        zoom={props.mapZoom ?? defaultMapZoom}
        options={defaultMapOptions}
      >
        {props.locatedMapUsers.map((user) => {
          const isActive = user._id === activeUserId;

          return (
            <MarkerF
              key={`${user.username}-${user._id}`}
              position={user.position}
              onMouseOver={() => onMarkerHover(user._id)}
              onMouseOut={onMarkerLeave} // Utilisation d'un délai pour ne pas fermer immédiatement
            >
              {isActive && (
                <InfoWindowF
                  position={user.position}
                  onCloseClick={onInfoWindowLeave}
                  options={{ disableAutoPan: true }}
                >
                  <div
                    onMouseEnter={onInfoWindowEnter}
                    onMouseLeave={onInfoWindowLeave} // Permet de ne pas fermer immédiatement lorsqu'on interagit avec le contenu
                  >
                    <Link href={`/profile/${user._id}`} className="flex flex-col w-32 h-32">
                      <p className="font-semibold text-lg">{user.username}</p>
                      <img
                        alt="profilePicture"
                        src={`${imageApi}/${user.profilePicture}`}
                        className="object-cover overflow-hidden"
                      />
                    </Link>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          );
        })}
      </GoogleMap>
    </div>
  );
}
