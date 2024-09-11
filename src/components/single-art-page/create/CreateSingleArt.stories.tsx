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
    artTypes: [
      {
        value: "painting",
        label: "Peinture",
        collapsed: false,
        subOptions: [
          { value: "oil", label: "Oil", selected: false },
          { value: "acrylic", label: "Acrylic", selected: false }
        ],
      },
      {
        value: "sculpture",
        label: "Sculpture",
        collapsed: false,
        subOptions: [
          { value: "wood", label: "Wood", selected: false },
          { value: "stone", label: "Stone", selected: false }
        ],
      },
      {
        value: "photography",
        label: "Photographie",
        collapsed: false,
        subOptions: [
          { value: "digital", label: "Digital", selected: false },
          { value: "film", label: "Film", selected: false }
        ],
      },
    ],
  },
};
