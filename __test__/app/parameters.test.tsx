import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Settings from "../../src/app/settings/page";

test("Parameters page test", () => {
  const { container } = render(<Settings />);

  expect(container.textContent).toContain("Page de paramètres");
});
