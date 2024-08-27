import Map from "../../components/map/Map";
import MapProvider from "../../providers/MapProvider";

export default function Page() {
  return (
    <MapProvider>
      <Map />
    </MapProvider>
  );
}
