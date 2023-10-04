import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { ITabsProps } from "./Tabs";

export default {
  title: "Components/Profile/Tabs",
  component: Tabs,
} as Meta<typeof Tabs>;

type Story = StoryObj<ITabsProps>;

export const regular: Story = {
  args: {},
};
