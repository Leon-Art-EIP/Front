import type { Meta, StoryObj } from "@storybook/react";

import Button, { IButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<IButtonProps>;

export const ButtonMock: Story = {
  args: {
    children: "Button",
    onClick: () => alert("Button clicked"),
    color: "danger",
  },
};
