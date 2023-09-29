import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Messages from "../../src/app/messages/page";

test("Messages page test", () => {
  const { container } = render(<Messages />);

  expect(container.textContent).toContain("Page de messages");
});
