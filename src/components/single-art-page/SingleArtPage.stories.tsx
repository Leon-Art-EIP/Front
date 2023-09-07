import type { Meta, StoryObj } from "@storybook/react";
import SingleArtPage, { ISingleArtPageProps } from "./SingleArtPage";
import Art from "../../assets/art1.jpeg";
import Profile from "../../assets/profile1.jpeg";

export default {
  title: "Components/SingleArtPage",
  component: SingleArtPage,
} as Meta<typeof SingleArtPage>;

type Story = StoryObj<ISingleArtPageProps>;

export const regular: Story = {
  args: {
    description:
      "Cette peinture est l’expression la plus pure du mélange chaud/froid, défini par les différentes teintes de rose et de bleu. Ici, nous pouvons assister à un affrontement au sein même de la nature : le froid et la tristesse des vagues contre la chaleur ainsi que l’aridité du désert rosé.",
    caracteristics: "Peinture - Huile sur toile, 187 x 121 cm",
    price: 199,
    art: Art,
    profile: Profile,
    title: "Mer de dunes noyées",
    nbrLikes: 457,
  },
};
