import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Button from "../../../src/components/profile/Button";

test("Button component test", () => {
  const { container } = render(<Button onClick={() => {}} text="bouton" />);

  expect(container.textContent).toContain("bouton");
});
