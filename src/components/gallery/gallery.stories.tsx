import type { Meta, StoryObj } from "@storybook/react";
import Gallery, { IGalleryProps } from ".";

export default {
  title: "Components/Gallery",
  component: Gallery,
} as Meta<typeof Gallery>;

type Story = StoryObj<IGalleryProps>;

export const regular: Story = {
  args: {
    redirectText: "Voir la galerie",
    redirectUrl: "#",
  },
};

export const noRightButton: Story = {
  args: {},
};
