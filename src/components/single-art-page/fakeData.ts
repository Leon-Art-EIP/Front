import Art from "../../assets/art1.jpeg";
import Profile from "../../assets/profile1.jpeg";
import Picture1 from "../../assets/picture1.jpeg";
import Picture2 from "../../assets/picture2.jpeg";
import Picture3 from "../../assets/picture3.jpeg";

const data = {
  description:
    "Cette peinture est l’expression la plus pure du mélange chaud/froid, défini par les différentes teintes de rose et de bleu. Ici, nous pouvons assister à un affrontement au sein même de la nature : le froid et la tristesse des vagues contre la chaleur ainsi que l’aridité du désert rosé.",
  caracteristics: "Peinture - Huile sur toile, 187 x 121 cm",
  price: 199,
  art: Art,
  artId: "1",
  profile: Profile,
  artistName: "Rosalia Basquiat",
  artistId: "1",
  title: "Mer de dunes noyées",
  liked: false,
  nbrLikes: 457,
  collections: [
    {
      id: 1,
      picture: Picture1,
      title: "Collection 1",
    },
    {
      id: 2,
      picture: Picture2,
      title: "Collection 2",
    },
    {
      id: 3,
      picture: Picture3,
      title: "Collection 3",
    },
  ],
  belongingCollections: [],
  belongingCommands: false,
};

export default data;
