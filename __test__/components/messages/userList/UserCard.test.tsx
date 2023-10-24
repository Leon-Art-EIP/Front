import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { UserCard, UserCardProps } from "../../../../src/components/messages/userList/UserCard";

describe("UserCard", () => {
  const mockData: UserCardProps = {
    data: {
      id: 0,
      profileName: "John Doe",
      profilePricture: "https://via.placeholder.com/150",
      lastMessage: "Hello",
      unreadMessages: true,
    },
    selected: false,
    handleSelectConv: vi.fn(),
  };
  
  const { container } = render(<UserCard {...mockData} />);

  test("renders user card with correct data", () => {
    expect(container.textContent).toContain(mockData.data.profileName);
    expect(container.textContent).toContain(mockData.data.lastMessage);
  });

  test("renders user card with unread messages", () => {
    expect(container.querySelector(".absolute")).not.toBeNull();
  });

  test("renders user card with selected class", () => {
    expect(container.querySelector(".bg-white")).toBeNull();
  });
});