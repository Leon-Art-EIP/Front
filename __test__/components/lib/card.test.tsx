import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Card } from "../../../src/components/lib/index";

test("Card test", () => {
  const { container } = render(<Card title="card">card</Card>);

  expect(container.textContent).toContain("card");
});
