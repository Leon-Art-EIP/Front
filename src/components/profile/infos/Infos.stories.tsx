import type { Meta, StoryObj } from "@storybook/react";
import Infos, { IInfosProps } from "./Infos";

export default {
  title: "Components/Profile/Infos",
  component: Infos,
} as Meta<typeof Infos>;

type Story = StoryObj<IInfosProps>;

export const AvailableForCommands: Story = {
  args: {
    availability: "available",
    artistName: "Lena H",
    numberOfFollowers: 1300,
    numberOfPosts: 64,
    link: "a",
    id: "1",
  },
};

export const UnavailableForCommands: Story = {
  args: {
    ...AvailableForCommands.args,
    availability: "unavailable",
  },
};
