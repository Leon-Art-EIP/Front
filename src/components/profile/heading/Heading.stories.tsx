import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

export default {
  title: "Components/Profile/Heading",
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj;

export const regular: Story = {
  args: {},
};
