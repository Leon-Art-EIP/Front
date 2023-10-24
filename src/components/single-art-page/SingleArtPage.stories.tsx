import type { Meta, StoryObj } from "@storybook/react";
import SingleArtPage, { ISingleArtPageProps } from "./SingleArtPage";
import fakeData from "./fakeData";

export default {
  title: "Components/SingleArtPage",
  component: SingleArtPage,
} as Meta<typeof SingleArtPage>;

type Story = StoryObj<ISingleArtPageProps>;

export const Regular: Story = {
  args: {
    ...fakeData,
    link: "a",
  },
};

export const Liked: Story = {
  args: {
    ...Regular.args,
    liked: true,
  },
};

export const BelongingCollection: Story = {
  args: {
    ...Liked.args,
    belongingCollections: [1],
  },
};

export const BelongingCommands: Story = {
  args: {
    ...BelongingCollection.args,
    belongingCommands: true,
  },
};
