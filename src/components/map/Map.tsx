/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import { nancyPosition1, nancyPosition6, nancyPositionsList } from "../../tools/positions";
import { ILocatedMapUser } from "../../interfaces/map";

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
  const onClickMarker = () => {
    console.log("Marker clicked");
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={props.mapCenter ?? defaultMapCenter}
        zoom={props.mapZoom ?? defaultMapZoom}
        options={defaultMapOptions}
      >
        {props.locatedMapUsers.map((user) => (
          <MarkerF key={`${user.username}-${user._id}`} position={user.position} onClick={onClickMarker} />
        ))}
        <InfoWindow position={nancyPosition6}>
          <div className="rounded-full">
            <h1>InfoWindow</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </div>
  );
}
