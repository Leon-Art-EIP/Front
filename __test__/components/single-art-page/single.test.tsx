import { render } from "@testing-library/react";
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
      setNewCollectionBody={() => {}}
      isNewCollectionLoading={false}
      newCollectionFetchs={0}
      setNewCollectionFetchs={() => {}}
    />
  );

  expect(container.textContent).toContain("Vous n'avez pas encore de collection");
});
