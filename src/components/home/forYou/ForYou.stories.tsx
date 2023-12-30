import type { Meta, StoryObj } from "@storybook/react";
import ForYou, { IForYouProps } from "./ForYou";
import { arts } from "./arts";

export default {
  title: "Components/Home/ForYou",
  component: ForYou,
} as Meta<typeof ForYou>;

type Story = StoryObj<IForYouProps>;

export const Regular: Story = {
  args: {
    forYouArts: arts,
    link: "a",
  },
};
