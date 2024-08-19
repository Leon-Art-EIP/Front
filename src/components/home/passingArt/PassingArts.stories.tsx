import type { Meta, StoryObj } from "@storybook/react";
import PassingArts, { IPassingArtsProps } from "./PassingArts";
import { passingArts } from "./passingArtsDummyData";

export default {
  title: "Components/Home/PassingArts",
  component: PassingArts,
} as Meta<typeof PassingArts>;

type Story = StoryObj<IPassingArtsProps>;

export const Regular: Story = {
  args: {
    passingArts: passingArts,
  },
};

export const LotOfArticles: Story = {
  args: {
    passingArts: passingArts.concat(passingArts).concat(passingArts).concat(passingArts).concat(passingArts),
  },
};
