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
    selectedTabName: "Accueil",
    link: "a",
  },
};

export const SelectExplorer: Story = {
  args: {
    tabs,
    selectedTabName: "Explorer",
    link: "a",
  },
};

export const SelectMessages: Story = {
  args: {
    tabs,
    selectedTabName: "Messagerie",
    link: "a",
  },
};

export const SelectPurchase: Story = {
  args: {
    tabs,
    selectedTabName: "Commandes",
    link: "a",
  },
};
