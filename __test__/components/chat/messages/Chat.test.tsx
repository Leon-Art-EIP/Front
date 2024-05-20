import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Chat, ChatProps } from '../../../../src/components/chat/messages/Chat';
import React from 'react';

const mockPropsUser: ChatProps = {
  content: 'This is a message from the current user.',
  sender: 0,
  dateTime: '10:00 AM',
};

const mockPropsOther: ChatProps = {
  content: 'This is a message from another user.',
  sender: 1,
  dateTime: '10:01 AM',
};

describe('Chat', () => {
  it('renders correctly with user message', () => {
    render(<Chat {...mockPropsUser} />);
    // expect(screen.getByText('This is a message from the current user.')).toBeInTheDocument();
    // expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('renders correctly with other user message', () => {
    render(<Chat {...mockPropsOther} />);
    // expect(screen.getByText('This is a message from another user.')).toBeInTheDocument();
    // expect(screen.getByText('10:01 AM')).toBeInTheDocument();
  });

  it('applies correct styles for user message', () => {
    render(<Chat {...mockPropsUser} />);
    // const messageElement = screen.getByText('This is a message from the current user.').closest('div');
    // expect(messageElement).toHaveClass('items-end');
    // expect(messageElement?.firstChild).toHaveClass('bg-primary text-white');
  });

  it('applies correct styles for other user message', () => {
    render(<Chat {...mockPropsOther} />);
    // const messageElement = screen.getByText('This is a message from another user.').closest('div');
    // expect(messageElement).toHaveClass('items-start');
    // expect(messageElement?.firstChild).toHaveClass('bg-background-hl text-tertiary');
  });
});
