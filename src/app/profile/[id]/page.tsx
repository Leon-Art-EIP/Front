import Gallery from "../../../components/gallery";
import Pictures from "../../../components/gallery/Pictures";
import { TCategory } from "../../../components/profile/category/category";
import Heading from "../../../components/profile/heading/Heading";
import Infos from "../../../components/profile/infos/Infos";
import PicturesWrapper from "../../../wrappers/profile/PicturesWrapper";
import TabsWrapper from "../../../wrappers/profile/TabsWrapper";

export default function Page(props: { params: { id: string } }): JSX.Element {
  const data: {
    // fetch data from user thanks to his id
    artistName: string;
    artistDescription: string;
    numberOfFollowers: number;
    numberOfPosts: number;
    categories: TCategory[];
  } = {
    artistName: "Lil Nas X",
    artistDescription: "Designer graphique",
    numberOfFollowers: 1345823,
    numberOfPosts: 84,
    categories: [
      "Huile",
      "Aquarelle",
      "Acrylique",
      "Gouache",
      "Tempéra",
      "Fresque",
      "Crayon",
      "Fusain",
      "Encre",
      "Pastel",
      "Sanguine",
      "Craie",
    ],
  };

  return (
    <div className="flex flex-col">
      <Heading />
      <div className="grid grid-cols-4">
        <div className="flex flex-col col-span-3 gap-2 p-4">
          <div className="w-3/4">
            <TabsWrapper />
          </div>
          <PicturesWrapper />
        </div>
        <div className="flex justify-center">
          <Infos
            artistDescription={data.artistDescription}
            artistName={data.artistName}
            categories={data.categories}
            numberOfFollowers={data.numberOfFollowers}
            numberOfPosts={data.numberOfPosts}
          />
        </div>
      </div>
    </div>
  );
}
