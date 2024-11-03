// __tests__/ChatList.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ChatList from "../../../../src/components/chat/chats/ChatList";
import { useChat } from "../../../../src/contexts/ChatContext";
import { IChat } from "../../../../src/interfaces/chat/chats";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("../../../../src/contexts/ChatContext");

vi.mock("../../../../src/components/searchBar/SearchBar", () => ({
  SearchBar: ({ onSearch }: { onSearch: (search: string) => void }) => (
    <input placeholder="Search..." onChange={(e) => onSearch(e.target.value)} data-testid="search-bar" />
  ),
}));

vi.mock("../../../../src/components/chat/chats/ChatUserCard", () => ({
  ChatUserCard: ({ chat, handleSelectChat }: { chat: IChat; handleSelectChat: (chat: IChat) => void }) => (
    <div onClick={() => handleSelectChat(chat)} data-testid={`chat-user-card-${chat._id}`}>
      {chat.UserOneName} - {chat.UserTwoName}
    </div>
  ),
}));

const mockUseChat = useChat as jest.Mock;

const mockChats: IChat[] = [
  {
    _id: "1",
    UserOneName: "Alice",
    UserTwoName: "Bob",
    lastMessage: "",
    unreadMessages: false,
    UserOneId: "",
    UserOnePicture: "",
    UserTwoId: "",
    UserTwoPicture: "",
    LastSenderId: ""
  },
  {
    _id: "2",
    UserOneName: "Charlie",
    UserTwoName: "Dave",
    lastMessage: "",
    unreadMessages: false,
    UserOneId: "",
    UserOnePicture: "",
    UserTwoId: "",
    UserTwoPicture: "",
    LastSenderId: ""
  },
];

describe("ChatList", () => {
  beforeEach(() => {
    mockUseChat.mockReturnValue({
      chats: mockChats,
      currentUser: "Alice",
      currentChat: null,
      setCurrentChat: vi.fn(),
    });
  });

  it("renders correctly", () => {
    render(<ChatList onDeleteChat={() => {}} />);
    expect(screen.getByTestId("search-bar")).not.toBeNull();
    expect(screen.getByText('Alice - Bob')).not.toBeNull();
  });

  it("displays chats when available", () => {
    expect(mockChats.length).toBeGreaterThan(0);
    expect(screen.getByText('Alice - Bob')).not.toBeNull();
    expect(screen.getByText('Charlie - Dave')).not.toBeNull();
  });

  it("filters chats based on search term", () => {
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'Charlie' } });
    expect(screen.getByText('Charlie - Dave')).not.toBeNull();
    fireEvent.change(searchBar, { target: { value: '' } });
    expect(screen.getByText('Charlie - Dave')).not.toBeNull();
    expect(screen.getByText('Alice - Bob')).not.toBeNull();
  });

  it("selects a chat when clicked", () => {
    const chatCard = screen.getByTestId('chat-user-card-1');
    fireEvent.click(chatCard);
  });

  it('displays "Aucune conversation" when no chats match search term', () => {
    const searchBar = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchBar, { target: { value: 'zglubluglu' } });
    expect(screen.getByText('Aucune conversation')).not.toBeNull();
  });
});
