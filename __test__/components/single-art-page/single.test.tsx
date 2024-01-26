import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import SingleArtPage from "../../../src/components/single-art-page/SingleArtPage";
import data from "../../../src/components/single-art-page/fakeData";
import SaveGallery from "../../../src/components/single-art-page/artwork/SaveGallery";
import SingleArtPageArtwork from "../../../src/components/single-art-page/artwork/SingleArtPageArtwork";
import SingleArtPageCard from "../../../src/components/single-art-page/card/SingleArtPageCard";

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

test("SingleArtPageCard regular test", () => {
  const { container } = render(
    <SingleArtPageCard
      artPublicationId={data.artId}
      caracteristics={data.caracteristics}
      description={data.description}
      price={data.price}
      link="a"
      belongingCommands={data.belongingCommands}
      paymentSuccessful={data.paymentSuccessful}
      paymentCanceled={data.paymentCanceled}
    />
  );

  expect(container.textContent).toContain("Description");
});
