import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Category from "../../../src/components/profile/category/Category";

test("Category component test", () => {
  const { container } = render(<Category category="Broderie" />);

  expect(container.textContent).toContain("Broderie");
});
