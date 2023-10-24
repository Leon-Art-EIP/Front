import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Messages from "../../src/app/messages/page";
import MessagesWrapper from "../../src/wrappers/messages/MessagesWrapper";

test("Messages page test", () => {
  const { container } = render(<MessagesWrapper />);

  expect(container).toMatchSnapshot();
});
