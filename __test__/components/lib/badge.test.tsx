import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Badge } from "../../../src/components/lib/index";

test("Badge danger test", () => {
  const { container } = render(<Badge text="badge" color="danger" />);

  expect(container.textContent).toContain("badge");
});

test("Badge info test", () => {
  const { container } = render(<Badge text="badge" color="info" />);

  expect(container.textContent).toContain("badge");
});

test("Badge success test", () => {
  const { container } = render(<Badge text="badge" color="success" />);

  expect(container.textContent).toContain("badge");
});

test("Badge no color test", () => {
  const { container } = render(<Badge text="badge" color="success" />);

  expect(container.textContent).toContain("badge");
});
