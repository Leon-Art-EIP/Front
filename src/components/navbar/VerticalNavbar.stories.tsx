import type { Meta, StoryObj } from "@storybook/react";
import tabs from "../../app/tabs";
import { INavbarProps } from "./Navbar";
import VerticalNavbar from "./VerticalNavbar";

export default {
  title: "Components/VerticalNavbar",
  component: VerticalNavbar,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondaryGrey">
        <Story args={args} />
      </div>
    ),
  ],
} as Meta<typeof VerticalNavbar>;

type Story = StoryObj<INavbarProps>;

export const VerticalSelectHome: Story = {
  args: {
    tabs,
    selectedTabHref: "/",
    link: "a",
  },
};

export const VerticalSelectExplorer: Story = {
  args: {
    tabs,
    selectedTabHref: "/explore",
    link: "a",
  },
};

export const VerticalSelectMessages: Story = {
  args: {
    tabs,
    selectedTabHref: "/messages",
    link: "a",
  },
};

export const VerticalSelectPurchase: Story = {
  args: {
    tabs,
    selectedTabHref: "/purchase",
    link: "a",
  },
};

export const VerticalSelectProfile: Story = {
  args: {
    tabs,
    selectedTabHref: "/profile",
    link: "a",
  },
};
