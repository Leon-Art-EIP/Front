import type { Meta, StoryObj } from '@storybook/react';

import Input, { InputProps } from './Input';
import { ChangeEvent } from "react";

export default {
  title: 'Components/Input',
  component: Input,
} as Meta<typeof Input>;

type Story = StoryObj<InputProps>;

export const InputMock: Story = {
  args: {
    value: '',
    placeHolder: 'Enter some text here',
    onChange: (event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value),
    label: 'Input',
    disabled: false,
    required: false,
    type: 'text',
  },
};
