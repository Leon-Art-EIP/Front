import type { Meta, StoryObj } from "@storybook/react";
import tabs from "../../app/tabs";
import Navbar, { INavbarProps } from "./Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondary">
        <Story args={args} />
      </div>
    ),
  ],
} as Meta<typeof Navbar>;

type Story = StoryObj<INavbarProps>;

export const SelectHome: Story = {
  args: {
    tabs,
    selectedTabHref: "/",
    link: "a",
    userId: "",
  },
};

export const SelectExplorer: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/explorer",
  },
};

export const SelectMessages: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/chat",
  },
};

export const SelectPurchase: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/purchase",
  },
};

export const SelectProfile: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/profile",
  },
};
