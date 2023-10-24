import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import UserList, { UserListProps } from "../../../../src/components/messages/userList/UserList";

describe("UserList", () => {
  const conversationServiceMock = {
    filteredConversations: {
      conversations: [
        {
          id: 0,
          profileName: "John Doe",
          profilePricture: "https://via.placeholder.com/150",
          lastMessage: "Hello",
          unreadMessages: true,
        },
      ],
    },
    filterConversations: vi.fn(),
    selectConversation: vi.fn(),
    convSelected: {
      id: 0,
      profileName: "John Doe",
      profilePricture: "https://via.placeholder.com/150",
      lastMessage: "Hello",
      unreadMessages: true,
    },
  };

  const mockData: UserListProps = {
    conversationService: conversationServiceMock as any,
  };

  const { container } = render(<UserList {...mockData} />);

  test("renders user card with correct data", () => {
    expect(container.textContent).toContain(mockData.conversationService.filteredConversations.conversations[0].profileName);
    expect(container.textContent).toContain(mockData.conversationService.filteredConversations.conversations[0].lastMessage);
  });

  test("renders user card with unread messages", () => {
    expect(container.querySelector(".absolute")).not.toBeNull();
  });
});