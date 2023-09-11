import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { NotificationToast } from "../../../src/components/lib/lib";

test("NotificationToast success test", () => {
  const { container } = render(<NotificationToast message="hey" type="success" />);

  expect(container.textContent).toContain("hey");
});

test("NotificationToast error test", () => {
  const { container } = render(<NotificationToast message="hey" type="error" />);

  expect(container.textContent).toContain("hey");
});

test("NotificationToast info test", () => {
  const { container } = render(<NotificationToast message="hey" type="info" />);

  expect(container.textContent).toContain("hey");
});
