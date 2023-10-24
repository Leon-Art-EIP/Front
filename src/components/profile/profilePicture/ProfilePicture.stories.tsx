import type { Meta, StoryObj } from "@storybook/react";
import ProfilePicture, { IProfilePictureProps } from "./ProfilePicture";
import profilePicture from "../../../assets/profilePicture.png";

export default {
  title: "Components/Profile/ProfilePicture",
  component: ProfilePicture,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondaryGrey">
        <Story args={args} />
      </div>
    ),
  ],
} as Meta<typeof ProfilePicture>;

type Story = StoryObj<IProfilePictureProps>;

export const Regular: Story = {
  args: {
    src: profilePicture,
  },
};
