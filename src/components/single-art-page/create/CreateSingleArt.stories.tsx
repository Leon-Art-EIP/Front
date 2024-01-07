import type { Meta, StoryObj } from "@storybook/react";
import CreateSingleArt from "./CreateSingleArt";

export default {
  title: "Components/CreateSingleArt",
  component: CreateSingleArt,
} as Meta<typeof CreateSingleArt>;

type Story = StoryObj;

export const Regular: Story = {
  args: {},
};
