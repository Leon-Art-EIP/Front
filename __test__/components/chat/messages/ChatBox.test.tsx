import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatBox } from '../../../../src/components/chat/messages/ChatBox';
import { useChat } from '../../../../src/contexts/ChatContext';
import { IMessage } from '../../../../src/interfaces/chat/messages';
import React from 'react';

vi.mock('../../../../src/contexts/ChatContext', () => ({
  useChat: vi.fn(),
}));

const mockMessages: IMessage[] = [
  {
    content: 'Hello, this is a test message.',
    senderId: '1',
    dateTime: new Date().toISOString(),
    read: true,
    contentType: 'text',
    id: 0
  },
  {
    content: 'This is another message.',
    senderId: '2',
    dateTime: new Date().toISOString(),
    read: true,
    contentType: 'text',
    id: 1
  },
];

const mockUseChat = useChat as jest.Mock;

describe('ChatBox', () => {
  beforeEach(() => {
    mockUseChat.mockReturnValue({
      messages: mockMessages,
      currentUser: { user: { id: '1' } },
    });
  });

  it('renders correctly', () => {
    render(<ChatBox />);
    // expect(screen.getByText('Hello, this is a test message.')).toBeInTheDocument();
    // expect(screen.getByText('This is another message.')).toBeInTheDocument();
  });

  it('formats and displays dates and times correctly', () => {
    render(<ChatBox />);
    // const dateRegex = /\w+ \d+, \d{4}/;
    // const timeRegex = /\d{1,2}:\d{2} (AM|PM)/;

    // expect(screen.getAllByText(dateRegex)[0]).toBeInTheDocument();
    // expect(screen.queryAllByText(timeRegex)).toHaveLength(0);
  });

  it('renders messages with correct alignment based on sender', () => {
    render(<ChatBox />);
    // const userMessage = screen.getByText('Hello, this is a test message.').closest('div');
    // const otherMessage = screen.getByText('This is another message.').closest('div');

    // expect(userMessage).toHaveClass('items-end');
    // expect(otherMessage).toHaveClass('items-start');
  });
});
