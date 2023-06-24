import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonProps } from '../components/lib/Buttons/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<ButtonProps>;

export const ButtonMock: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('Button clicked'),
    color: 'danger',
  },
};