import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import IconLabel from "../../../src/components/label/IconLabel.tsx";

test("renders Icon label 1", () => {
  const { container } = render(<IconLabel icon={KeyboardArrowLeft} text="go left" />);
  expect(container.textContent).toContain("go left");
});

test("renders Icon label 2", () => {
  const { container } = render(<IconLabel icon={KeyboardArrowRight} text="go right" />);
  expect(container.textContent).toContain("go right");
});

test("renders Icon label 3", () => {
  const { container } = render(<IconLabel icon={KeyboardArrowDown} text="go down" />);
  expect(container.textContent).toContain("go down");
});

test("renders Icon label 2", () => {
  const { container } = render(<IconLabel icon={KeyboardArrowUp} text="go up" />);
  expect(container.textContent).toContain("go up");
});
