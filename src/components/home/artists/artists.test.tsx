import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import Artists from "./Artists";

test("Badge danger test", () => {
  const { container } = render(<Artists artists={[]} link="a" />);

  expect(container.textContent).toContain("Artistes");
});
