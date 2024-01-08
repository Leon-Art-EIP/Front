import type { Meta, StoryObj } from "@storybook/react";
import CreateSingleArt from "./CreateSingleArt";
import { ICreateArtFormProps } from "../../../forms/tsx/CreateArtForm";

export default {
  title: "Components/CreateSingleArt",
  component: CreateSingleArt,
  decorators: [
    (Story: any) => (
      <div className="bg-secondaryGrey px-32">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof CreateSingleArt>;

type Story = StoryObj<ICreateArtFormProps>;

export const Regular: Story = {
  args: {
    options: [
      { value: "painting", label: "Peinture" },
      { value: "sculpture", label: "Sculpture" },
      { value: "photography", label: "Photographie" },
    ],
  },
};
