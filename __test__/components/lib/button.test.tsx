import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Button } from "../../../src/components/lib/index";

test("Button danger test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="danger" type="button">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});

test("Button success test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="success" type="button">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});

test("Button info test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="info" type="button">
      bouton
    </Button>
  );

  expect(container.textContent).toContain("bouton");
});

test("Button loading test", () => {
  const { container } = render(
    <Button onClick={() => {}} color="info" type="button" loading={true}>
      bouton
    </Button>
  );

  expect(container.textContent).not.toContain("bouton");
});
