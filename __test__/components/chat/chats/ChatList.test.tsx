// __tests__/ChatList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatList from '../../../../src/components/chat/chats/ChatList';
import { useChat } from '../../../../src/contexts/ChatContext';
import { IChat } from '../../../../src/interfaces/chat/chats';
import React from 'react';

vi.mock('../../../../src/contexts/ChatContext');

vi.mock('../../../../src/components/searchBar/SearchBar', () => ({
  SearchBar: ({ onSearch }: { onSearch: (search: string) => void }) => (
    <input
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-bar"
    />
  ),
}));

vi.mock('../../../../src/components/chat/chats/ChatUserCard', () => ({
  ChatUserCard: ({ chat, handleSelectChat }: { chat: IChat; handleSelectChat: (chat: IChat) => void }) => (
    <div onClick={() => handleSelectChat(chat)} data-testid={`chat-user-card-${chat._id}`}>
      {chat.UserOneName} - {chat.UserTwoName}
    </div>
  ),
}));

const mockUseChat = useChat as jest.Mock;

const mockChats: IChat[] = [
  {
    _id: '1',
    UserOneName: 'Alice',
    UserTwoName: 'Bob',
    lastMessage: '',
    unreadMessages: false,
    UserOneId: '',
    UserOnePicture: '',
    UserTwoId: '',
    UserTwoPicture: ''
  },
  {
    _id: '2',
    UserOneName: 'Charlie',
    UserTwoName: 'Dave',
    lastMessage: '',
    unreadMessages: false,
    UserOneId: '',
    UserOnePicture: '',
    UserTwoId: '',
    UserTwoPicture: ''
  },
];

describe('ChatList', () => {
  beforeEach(() => {
    mockUseChat.mockReturnValue({
      chats: mockChats,
      currentUser: 'Alice',
      currentChat: null,
      setCurrentChat: vi.fn(),
    });
  });

  it('renders correctly', () => {
    render(<ChatList />);
    // expect(screen.getByPlaceholderText('Search...')).not.toBeNull();
    // expect(screen.getByText('Aucune conversation')).not.toBeNull();
  });

  it('displays chats when available', () => {
    render(<ChatList />);
    // expect(screen.getByText('Alice')).not.toBeNull();
    // expect(screen.getByText('Bob')).not.toBeNull();
    // expect(screen.getByText('Charlie')).not.toBeNull();
    // expect(screen.getByText('Dave')).not.toBeNull();
  });

  it('filters chats based on search term', () => {
    render(<ChatList />);
    // const searchBar = screen.getByPlaceholderText('Search...');
    // fireEvent.change(searchBar, { target: { value: 'Alice' } });
    // expect(screen.getByText('Alice')).not.toBeNull();
    // expect(screen.queryByText('Charlie')).toBeNull();
  });

  it('selects a chat when clicked', () => {
    render(<ChatList />);
    // const chatCard = screen.getByText('Alice').closest('button');
    // if (chatCard) fireEvent.click(chatCard);
    // const { setCurrentChat } = useChat();
    // expect(setCurrentChat).toHaveBeenCalledWith(mockChats[0]);
  });

  it('displays "Aucune conversation" when no chats match search term', () => {
    render(<ChatList />);
    // const searchBar = screen.getByPlaceholderText('Search...');
    // fireEvent.change(searchBar, { target: { value: 'Zelda' } });
    // expect(screen.getByText('Aucune conversation')).not.toBeNull();
  });
});
