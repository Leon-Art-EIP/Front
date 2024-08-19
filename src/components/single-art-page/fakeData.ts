import Art from "../../assets/art1.jpeg";
import Profile from "../../assets/profile1.jpeg";
import { ISingleArtPageProps } from "./SingleArtPage";

const data: Omit<ISingleArtPageProps, "link"> = {
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
  collections: [],
  belongingCollectionsIds: [],
  belongingCommands: false,
  paymentSuccessful: false,
  paymentCanceled: false,
  connectedUserId: "1",
  isForSale: true,
  isSold: false,
};

export default data;
