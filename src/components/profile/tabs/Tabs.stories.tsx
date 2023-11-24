import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { ITabsProps } from "./Tabs";

export default {
  title: "Components/Profile/Tabs",
  component: Tabs,
} as Meta<typeof Tabs>;

type Story = StoryObj<ITabsProps>;

export const PublicationsSelected: Story = {
  args: {
    selectedTab: "publications",
  },
};

export const CollectionsSelected: Story = {
  args: {
    selectedTab: "collections",
  },
};

export const AboutSelected: Story = {
  args: {
    selectedTab: "about",
  },
};
