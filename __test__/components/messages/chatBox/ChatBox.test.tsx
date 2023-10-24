import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ChatBox, ChatBoxProps } from "../../../../src/components/messages/chatBox/ChatBox";

describe("ChatBox", () => {
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

  const messageServiceMock = {
    messages: {
      messages: [
        {
          id: 0,
          content: "Hello",
          sender: 0,
          dateTime: "2021-08-05T12:00:00.000Z",
        },
      ],
    },
    sendMessage: vi.fn(),
  };

  const mockData: ChatBoxProps = {
    conversationService: conversationServiceMock as any,
    messageService: messageServiceMock as any,
  };

  const { container } = render(<ChatBox {...mockData} />);

  test("renders chat box with correct data", () => {
    expect(container.textContent).toContain(mockData.messageService.messages.messages[0].content);
  });

  test("renders chat box with correct date and time", () => {
    expect(container.textContent).toContain("5 août 2021");
  });
});