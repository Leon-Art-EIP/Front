/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import { GoogleMap, MarkerF } from "@react-google-maps/api";

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
  markerCoords?: google.maps.LatLngLiteral;
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
        {props.markerCoords && <MarkerF position={props.markerCoords} onClick={onClickMarker} />}
      </GoogleMap>
    </div>
  );
}
