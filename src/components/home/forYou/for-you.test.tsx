import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import ForYou from "./ForYou";

test("Badge danger test", () => {
  const { container } = render(<ForYou forYouArts={[]} link="a" />);

  expect(container.textContent).toContain("Pour vous");
});
