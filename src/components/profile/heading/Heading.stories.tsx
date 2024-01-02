import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";
import banner from "../../../assets/profileBanner.png";
import profilePicture from "../../../assets/profilePicture.png";

export default {
  title: "Components/Profile/Heading",
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj;

export const Regular: Story = {
  args: {
    profilePicture,
    banner,
  },
};
