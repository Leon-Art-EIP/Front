import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Test } from "../src/components/test";

test("basic test", () => {
  const { container: container1 } = render(<Test r={5} />);
  const { container: container2 } = render(<Test r={7} />);

  expect(container1.innerHTML).toContain("test déploiement");
  expect(container2.innerHTML).toContain("R est supérieur à 5");
});
