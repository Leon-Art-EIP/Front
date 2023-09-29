import type { Meta, StoryObj } from '@storybook/react';

import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta<typeof Badge>;

type Story = StoryObj<BadgeProps>;

export const BadgeMock: Story = {
  args: {
    text: 'Badge',
    color: 'danger',
  },
};
