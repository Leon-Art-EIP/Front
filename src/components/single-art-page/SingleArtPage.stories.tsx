import type { Meta, StoryObj } from "@storybook/react";
import SingleArtPage, { ISingleArtPageProps } from "./SingleArtPage";
import fakeData from "./fakeData";

export default {
  title: "Components/SingleArtPage",
  component: SingleArtPage,
} as Meta<typeof SingleArtPage>;

type Story = StoryObj<ISingleArtPageProps>;

export const regular: Story = {
  args: {
    ...fakeData,
    link: "a",
  },
};

export const liked: Story = {
  args: {
    ...regular.args,
    liked: true,
  },
};

export const belongingCollection: Story = {
  args: {
    ...liked.args,
    belongingCollections: [1],
  },
};

export const belongingCommands: Story = {
  args: {
    ...belongingCollection.args,
    belongingCommands: true,
  },
};
