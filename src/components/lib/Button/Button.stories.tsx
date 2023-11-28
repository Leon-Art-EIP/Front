import type { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<ButtonProps>;

export const ButtonMock: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('Button clicked'),
    color: 'primary',
    type: "button",
  },
};
