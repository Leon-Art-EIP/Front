import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Chat, ChatProps } from "../../../../src/components/messages/chatBox/Chat";

describe("Chat", () => {
  const mockData: ChatProps = {
    content: "Hello",
    sender: 0,
    dateTime: "12:00",
  };
  
  const { container } = render(<Chat {...mockData} />);

  test("renders chat with correct data", () => {
    expect(container.textContent).toContain(mockData.content);
    expect(container.textContent).toContain(mockData.dateTime);
  });
});