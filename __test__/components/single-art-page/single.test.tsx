import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import SaveGallery from "../../../src/components/single-art-page/artwork/SaveGallery";
import data from "../../../src/components/single-art-page/fakeData";

test("SaveGallery regular test", () => {
  const { container } = render(
    <SaveGallery
      collections={data.collections}
      handleClose={() => {}}
      selectedCollections={[]}
      setSelectedCollections={() => {}}
      artId={"1"}
    />
  );

  expect(container.textContent).toContain("Vous n'avez pas encore de collection");
});
