import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { expect, test, vitest } from "vitest";
import data from "../../../src/components/single-art-page/fakeData";
import Collections from "../../../src/components/single-art-page/artwork/Collections";

test("Collections test", () => {
  const { container } = render(
    <Collections collections={data.collections} handleSelectCollection={() => {}} selectedCollections={[1, 2]} />
  );

  expect(container.textContent).toContain(data.collections[0].title);

  const collectionDiv = container.querySelector(`div[id="collection-${data.collections[0].id}"]`);

  if (collectionDiv) fireEvent.click(collectionDiv);
  else console.log("je suis un perdant pt n!!!");
});
