import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Infos from "../../../src/components/profile/infos/Infos";

test("Infos component test", () => {
  const { container } = render(
    <Infos
      artistDescription="description"
      artistName="jean"
      categories={["Broderie", "Peinture"]}
      numberOfFollowers={1234}
      numberOfPosts={3}
    />
  );

  expect(container.textContent).toContain("description");
  expect(container.textContent).toContain("jean");
});
