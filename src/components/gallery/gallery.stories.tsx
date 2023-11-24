import type { Meta, StoryObj } from "@storybook/react";
import Gallery, { IGalleryProps } from ".";

export default {
  title: "Components/Gallery",
  component: Gallery,
} as Meta<typeof Gallery>;

type Story = StoryObj<IGalleryProps>;

export const Regular: Story = {
  args: {
    redirectText: "Voir la galerie",
    redirectUrl: "#",
  },
};

export const NoRightButton: Story = {
  args: {},
};
