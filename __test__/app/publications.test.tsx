import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Publications from "../../src/app/publications/page";

test("Publications page test", () => {
  const { container } = render(<Publications />);

  expect(container.textContent).toContain("Page de publications");
});
