import type { Meta, StoryObj } from '@storybook/react';
import SingleArtPageCard, { ISingleArtPageCardProps } from './SingleArtPageCard';

export default {
  title: 'Components/SingleArtPage/SingleArtPageCard',
  component: SingleArtPageCard,
} as Meta<typeof SingleArtPageCard>;

type Story = StoryObj<ISingleArtPageCardProps>;

export const SingleArtPageCardMock: Story = {
  args: {
    description: 'Description of the art',
    caracteristics: 'Caracteristics of the art',
    price: 100,
  },
};
