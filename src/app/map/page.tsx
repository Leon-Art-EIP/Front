import ShareLocalisation from "../../components/localisation/ShareLocalisation";
import Map from "../../components/map/Map";
import MapProvider from "../../providers/MapProvider";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <MapProvider>
        <Map />
      </MapProvider>
      <ShareLocalisation color="primary" className="self-center" />
    </div>
  );
}
