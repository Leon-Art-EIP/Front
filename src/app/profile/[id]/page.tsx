import { TCategory } from "../../../components/profile/category/category";
import Heading from "../../../components/profile/heading/Heading";
import Infos from "../../../components/profile/infos/Infos";
import TabsWrapper from "../../../wrappers/profile/TabsWrapper";

export default function Page(props: { params: { id: string } }): JSX.Element {
  const data: {
    // fetch data from user thanks to his id
    artistName: string;
    artistDescription: string;
    numberOfFollowers: number;
    numberOfPosts: number;
    categories: TCategory[];
    aboutTitle: string;
    aboutDescription: string;
    collections: {
      id: number;
      title: string;
      picturesIds: number[];
    }[];
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
    aboutTitle: "Bienvenue dans mon espace créatif",
    aboutDescription: "Je suis un artiste peintre qui aime la peinture à l'huile.",
    collections: [
      {
        id: 1,
        title: "Collection 1",
        picturesIds: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 2,
        title: "Collection 2",
        picturesIds: [1, 2, 3, 4, 5, 6],
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <Heading />
      <div className="grid grid-cols-4">
        <div className="flex flex-col col-span-3 gap-2 p-4">
          <TabsWrapper
            aboutTitle={data.aboutTitle}
            aboutDescription={data.aboutDescription}
            collections={data.collections}
          />
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
