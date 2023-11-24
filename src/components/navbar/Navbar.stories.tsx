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
    user: {
      id: "",
      username: "",
      email: "",
      is_artist: false,
      availability: "",
      subscription: "",
      collections: [],
    },
  },
};

export const SelectExplorer: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/explore",
  },
};

export const SelectMessages: Story = {
  args: {
    ...SelectHome.args,
    selectedTabHref: "/messages",
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
