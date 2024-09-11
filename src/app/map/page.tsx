import MapWrapper, { ICoords } from "../../wrappers/map/MapWrapper";

export default function Page({ searchParams }: { searchParams?: ICoords }) {
  let coords: ICoords | undefined;

  if (searchParams && searchParams.latitude && searchParams.longitude) {
    coords = searchParams;
  }

  return <MapWrapper coords={coords} />;
}
