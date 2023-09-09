import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import data from "../../../src/components/single-art-page/fakeData";
import SaveGallery from "../../../src/components/single-art-page/artwork/SaveGallery";

test("Collections test", () => {
  const { container } = render(
    <SaveGallery
      belongingCollections={data.belongingCollections}
      collections={data.collections}
      handleClose={() => {}}
      selectedCollections={[1, 2]}
      setSelectedCollections={() => {}}
    />
  );

  expect(container.textContent).toContain("Enregistrer dans les galeries");
});
