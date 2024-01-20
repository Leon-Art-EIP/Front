import type { Meta, StoryObj } from "@storybook/react";
import Artists, { IArtistsProps } from "./Artists";
import { artists } from "./artistsDummyData";

export default {
  title: "Components/Home/Artists",
  component: Artists,
} as Meta<typeof Artists>;

type Story = StoryObj<IArtistsProps>;

export const Regular: Story = {
  args: {
    artists: [artists[0], artists[1], artists[2], artists[3], artists[4], artists[5]],
    link: "a",
  },
};

export const Scroll: Story = {
  args: {
    artists,
    link: "a",
  },
};
