import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Purchase from "../../src/app/purchase/page";

test("Purchase page test", () => {
  const { container } = render(<Purchase />);

  expect(container.textContent).toContain("Page d'achats");
});
