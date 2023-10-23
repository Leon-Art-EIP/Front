import type { Meta, StoryObj } from "@storybook/react";
import Infos, { IInfosProps } from "./Infos";

export default {
  title: "Components/Profile/Infos",
  component: Infos,
} as Meta<typeof Infos>;

type Story = StoryObj<IInfosProps>;

export const regular: Story = {
  args: {
    artistDescription: "Designer graphique",
    artistName: "Lena H",
    categories: ["Photographie numérique", "Photographe couleur", "Art vestimentaire", "Acrylique", "Broderie"],
    numberOfFollowers: 1300,
    numberOfPosts: 64,
  },
};
