import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import IconButton from "../../../src/components/profile/IconButton";
import { ChevronLeft } from "@mui/icons-material";

test("IconButton component test", () => {
  const { container } = render(<IconButton onClick={() => {}} text="bouton" icon={ChevronLeft} />);

  expect(container.textContent).toContain("bouton");
});

test("IconButton component left test", () => {
  const { container } = render(<IconButton onClick={() => {}} text="bouton" icon={ChevronLeft} left />);

  expect(container.textContent).toContain("bouton");
});
