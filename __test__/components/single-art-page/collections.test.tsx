import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import data from "../../../src/components/single-art-page/fakeData";
import Collections from "../../../src/components/single-art-page/artwork/Collections";

test("Collections test", () => {
  const { container } = render(
    <Collections collections={data.collections} handleSelectCollection={() => {}} selectedCollections={[1, 2]} />
  );

  expect(container.textContent).toContain("Enregistrer dans les galeries");
});
