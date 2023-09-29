import type { Meta, StoryObj } from '@storybook/react';

import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<InputProps>;

export const InputMock: Story = {
  args: {
    value: '',
    placeholder: 'Enter some text',
    onChange: (value: string) => console.log(value),
  },
};
