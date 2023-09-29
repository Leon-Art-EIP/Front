import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Parameters from "../../src/app/parameters/page";

test("Parameters page test", () => {
  const { container } = render(<Parameters />);

  expect(container.textContent).toContain("Page de paramètres");
});
