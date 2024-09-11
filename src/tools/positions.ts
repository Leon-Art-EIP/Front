import { ICoords } from "../wrappers/map/MapWrapper";

export function positionToCoords(position: google.maps.LatLngLiteral): ICoords {
  return {
    latitude: position.lat.toString(),
    longitude: position.lng.toString(),
  };
}
