import { test } from "vitest";
import SaveGallery from "../../src/components/single-art-page/artwork/SaveGallery";
import data from "../../src/components/single-art-page/fakeData";
import { testSnapshot } from "../function/utils";

test("SaveGallery snapshot", () => {
  testSnapshot(
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
});

test("SaveGallery Empty snapshot", () => {
  testSnapshot(
    <SaveGallery
      collections={[]}
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
});
