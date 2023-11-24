import type { Meta, StoryObj } from "@storybook/react";
import Collections, { ICollectionsProps } from "./Collections";

export default {
  title: "Components/Profile/Collections",
  component: Collections,
} as Meta<typeof Collections>;

type Story = StoryObj<ICollectionsProps>;

export const Regular: Story = {
  args: {
    collections: [
      {
        id: 1,
        title: "Collection 1",
        picturesIds: [1, 2, 3, 4, 5, 6],
      },
      {
        id: 2,
        title: "Collection 2",
        picturesIds: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
};
