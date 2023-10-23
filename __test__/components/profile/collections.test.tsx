import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Collections from "../../../src/components/profile/collections/Collections";

test("Collections component test", () => {
  const { container } = render(
    <Collections
      collections={[
        {
          id: 1,
          title: "Paintings",
          picturesIds: [1, 2, 3],
        },
        {
          id: 2,
          title: "Drawings",
          picturesIds: [4, 5, 6],
        },
      ]}
    />
  );

  expect(container.textContent).toContain("Paintings");
  expect(container.textContent).toContain("Drawings");
});
