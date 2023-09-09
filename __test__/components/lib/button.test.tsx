import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Button } from "../../../src/components/lib/lib";

test("Button danger test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="danger">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});

test("Button success test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="success">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});

test("Button info test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="info">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});
