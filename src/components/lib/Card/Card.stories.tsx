import type { Meta, StoryObj } from "@storybook/react";

import Card, { CardProps } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
} as Meta<typeof Card>;

type Story = StoryObj<CardProps>;

export const CardMock: Story = {
  args: {
    title: "Title of the card",
    children: "Content of the card",
  },
};
