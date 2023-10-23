import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import About from "../../../src/components/profile/about/About";

test("About component test", () => {
  const { container } = render(<About description="Je suis peintre" title="A propos de moi" />);

  expect(container.textContent).toContain("Je suis peintre");
  expect(container.textContent).toContain("A propos de moi");
});
