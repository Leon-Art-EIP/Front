import type { Meta, StoryObj } from "@storybook/react";
import Category, { ICategoryProps } from "./Category";

export default {
  title: "Components/Profile/Category",
  component: Category,
  decorators: [
    (Story, { args }) => (
      <div className="w-full p-4 flex justify-center bg-secondaryGrey">
        <Story args={args} />
      </div>
    ),
  ],
} as Meta<typeof Category>;

type Story = StoryObj<ICategoryProps>;

export const regular: Story = {
  args: {
    category: "Art vestimentaire",
  },
};
