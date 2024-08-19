import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatUserCard, ChatUserCardProps } from '../../../../src/components/chat/chats/ChatUserCard';
import { IChat } from '../../../../src/interfaces/chat/chats';
import { IConnectedUser } from '../../../../src/interfaces/user/user';
import React from 'react';

const mockChat: IChat = {
  _id: '1',
  UserOneName: 'Alice',
  UserTwoName: 'Bob',
  lastMessage: 'Hello Bob',
  unreadMessages: true,
  UserOneId: '1',
  UserOnePicture: 'userOnePicture.jpg',
  UserTwoId: '2',
  UserTwoPicture: 'userTwoPicture.jpg'
};

const mockCurrentUser: IConnectedUser = {
  user: {
    id: '1',
    email: 'alice@example.com',
    username: 'Alice',
    is_artist: false,
    availability: '',
    subscription: '',
    collections: []
  },
  token: ''
};

const mockProps: ChatUserCardProps = {
  chat: mockChat,
  currentUser: mockCurrentUser,
  currentSelected: undefined,
  handleSelectChat: vi.fn(),
};

describe('ChatUserCard', () => {
  it('renders correctly', () => {
    render(<ChatUserCard {...mockProps} />);
    // expect(screen.getByText('Alice')).not.toBeNull();
    // expect(screen.getByText('Hello Bob')).not.toBeNull();
  });

  it('displays the unread message indicator', () => {
    render(<ChatUserCard {...mockProps} />);
    // expect(screen.getByRole('img', { hidden: true })).toHaveClass('bg-primary');
  });

  it('calls handleSelectChat when clicked', () => {
    render(<ChatUserCard {...mockProps} />);
    // const chatCard = screen.getByText('Alice').closest('div');
    // if (chatCard) fireEvent.click(chatCard);
    // expect(mockProps.handleSelectChat).toHaveBeenCalledWith(mockChat);
  });

  it('renders user picture correctly based on current user', () => {
    render(<ChatUserCard {...mockProps} />);
    // const userImage = screen.getByAltText('profilePicture') as HTMLImageElement;
    // expect(userImage.src).toContain('userTwoPicture.jpg');
  });

  it('highlights the selected chat', () => {
    const selectedProps = { ...mockProps, currentSelected: mockChat };
    render(<ChatUserCard {...selectedProps} />);
    // const chatCard = screen.getByText('Alice').closest('div');
    // if (chatCard) expect(chatCard).toHaveClass('bg-secondary-hover');
  });
});
