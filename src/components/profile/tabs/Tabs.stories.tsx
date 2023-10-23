import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { ITabsProps } from "./Tabs";

export default {
  title: "Components/Profile/Tabs",
  component: Tabs,
} as Meta<typeof Tabs>;

type Story = StoryObj<ITabsProps>;

export const publicationsSelected: Story = {
  args: {
    selectedTab: "publications",
  },
};

export const collectionsSelected: Story = {
  args: {
    selectedTab: "collections",
  },
};

export const aboutSelected: Story = {
  args: {
    selectedTab: "about",
  },
};
