import { useState, useRef } from "react";
import { GoogleMap, InfoWindowF, MarkerClustererF, MarkerF } from "@react-google-maps/api";
import Link from "next/link";
import { ILocatedMapUser } from "../../interfaces/map";
import { imageApi } from "../../tools/variables";

// Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "0px 0px 0px 0px",
};

const defaultMapCenter = {
  // milieu France
  lat: 47.81,
  lng: 2.308,
};

const defaultMapZoom = 6;

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

  if (props.locatedMapUsers.length === 0) {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={props.mapCenter ?? defaultMapCenter}
          zoom={props.mapZoom ?? defaultMapZoom}
          options={defaultMapOptions}
        />
      </div>
    );
  }

  const onMarkerHover = (userId: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveUserId(userId);
  };

  const onMarkerLeave = () => {
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
        <MarkerClustererF options={{ gridSize: 50, minimumClusterSize: 2, maxZoom: 15 }}>
          {(clusterer) => (
            <>
              {props.locatedMapUsers.map((user) => {
                const isActive = user._id === activeUserId;

                return (
                  <MarkerF
                    key={`${user.username}-${user._id}`}
                    position={user.position}
                    clusterer={clusterer}
                    onMouseOver={() => onMarkerHover(user._id)}
                    onMouseOut={onMarkerLeave}
                  >
                    {isActive && (
                      <InfoWindowF
                        position={user.position}
                        onCloseClick={onInfoWindowLeave}
                        options={{ disableAutoPan: true }}
                      >
                        <div onMouseEnter={onInfoWindowEnter} onMouseLeave={onInfoWindowLeave}>
                          <Link
                            href={`/profile/${user._id}`}
                            className="flex flex-col gap-1 w-32 h-32 items-center hover:bg-background-inputfield rounded p-2 hover:text-primary"
                          >
                            <p className="font-semibold text-lg">{user.username}</p>
                            <img
                              alt="profilePicture"
                              src={`${imageApi}/${user.profilePicture}`}
                              className="object-contain overflow-hidden"
                            />
                          </Link>
                        </div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                );
              })}
            </>
          )}
        </MarkerClustererF>
      </GoogleMap>
    </div>
  );
}
