import type { Meta, StoryObj } from "@storybook/react";
import Navbar, { INavbarProps } from "./Navbar";
import tabs from "../../app/tabs";

export default {
  title: "Components/Navbar",
  component: Navbar,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondaryGrey">
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
  },
};

export const SelectExplorer: Story = {
  args: {
    tabs,
    selectedTabHref: "/explore",
    link: "a",
  },
};

export const SelectMessages: Story = {
  args: {
    tabs,
    selectedTabHref: "/messages",
    link: "a",
  },
};

export const SelectPurchase: Story = {
  args: {
    tabs,
    selectedTabHref: "/purchase",
    link: "a",
  },
};

export const SelectProfile: Story = {
  args: {
    tabs,
    selectedTabHref: "/profile",
    link: "a",
  },
};
