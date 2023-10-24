import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import MessagesWrapper from "../../../src/wrappers/messages/MessagesWrapper";

describe("MessagesWrapper", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(<MessagesWrapper />).container;
  });

  test("should show conversation when user is selected", () => {
    const user = container.querySelector(".user");
    if (user) {
      fireEvent.click(user);
      const conversation = container.querySelector(".conversation");
      expect(conversation).toBeInTheDocument();
    }
  });

  test("should hide conversation when user is deselected", () => {
    const user = container.querySelector(".user");
    if (user) {
      fireEvent.click(user);
      fireEvent.click(user);
      const conversation = container.querySelector(".conversation");
      expect(conversation).not.toBeInTheDocument();
    }
  });

});
