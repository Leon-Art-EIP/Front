import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import { expect, test, describe, vi } from "vitest";
import { NotificationToast } from "../../../src/components/lib/index";

describe("NotificationToast Tests", () => {
  test("NotificationToast should close after 5000ms", async () => {
    vi.useFakeTimers();
    const { queryByText } = render(<NotificationToast message="hey" type="success" />);

    expect(queryByText("hey")).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(5500);
    });

    expect(queryByText("hey")).toBeNull();
    vi.useRealTimers();
  });

  test("NotificationToast should close when close button is clicked", async () => {
    const { queryByText, getByText } = render(<NotificationToast message="hey" type="success" />);

    expect(queryByText("hey")).toBeTruthy();

    const closeButton = getByText("Ok");
    fireEvent.click(closeButton);

    // Use setTimeout to wait for 500ms
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(queryByText("hey")).toBeNull();
  });

  test("NotificationToast success test", () => {
    const { container } = render(<NotificationToast message="hey" type="success" />);

    expect(container.textContent).toContain("hey");

    const closeToastButton = container.querySelector("#close-toast");
    if (closeToastButton) fireEvent.click(closeToastButton);
  });

  test("NotificationToast error test", () => {
    const { container } = render(<NotificationToast message="hey" type="error" />);

    expect(container.textContent).toContain("hey");
  });
});
