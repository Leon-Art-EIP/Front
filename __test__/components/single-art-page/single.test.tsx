import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import SingleArtPage from "../../../src/components/single-art-page/SingleArtPage";
import data from "../../../src/components/single-art-page/fakeData";

test("Single Art page regular test", () => {
  const { container } = render(
    <SingleArtPage
      art={data.art}
      artistId={data.artistId}
      artistName={data.artistName}
      belongingCollections={data.belongingCollections}
      belongingCommands={data.belongingCommands}
      caracteristics={data.caracteristics}
      collections={data.collections}
      description={data.description}
      link="a"
      price={data.price}
      profile={data.profile}
      title={data.title}
      liked={data.liked}
      nbrLikes={data.nbrLikes}
    />
  );

  expect(container.textContent).toContain("Faire une offre");
});

test("Single Art page liked test", () => {
  const { container } = render(
    <SingleArtPage
      art={data.art}
      artistId={data.artistId}
      artistName={data.artistName}
      belongingCollections={data.belongingCollections}
      belongingCommands={data.belongingCommands}
      caracteristics={data.caracteristics}
      collections={data.collections}
      description={data.description}
      link="a"
      price={data.price}
      profile={data.profile}
      title={data.title}
      liked={true}
      nbrLikes={data.nbrLikes}
    />
  );

  expect(container.textContent).toContain("Faire une offre");
});

test("Single Art page belonging collection test", () => {
  const { container } = render(
    <SingleArtPage
      art={data.art}
      artistId={data.artistId}
      artistName={data.artistName}
      belongingCollections={[1]}
      belongingCommands={data.belongingCommands}
      caracteristics={data.caracteristics}
      collections={data.collections}
      description={data.description}
      link="a"
      price={data.price}
      profile={data.profile}
      title={data.title}
      liked={data.liked}
      nbrLikes={data.nbrLikes}
    />
  );

  expect(container.textContent).toContain("Faire une offre");
});

test("Single Art page belonging commands test", () => {
  const { container } = render(
    <SingleArtPage
      art={data.art}
      artistId={data.artistId}
      artistName={data.artistName}
      belongingCollections={data.belongingCollections}
      belongingCommands={true}
      caracteristics={data.caracteristics}
      collections={data.collections}
      description={data.description}
      link="a"
      price={data.price}
      profile={data.profile}
      title={data.title}
      liked={data.liked}
      nbrLikes={data.nbrLikes}
    />
  );

  expect(container.textContent).toContain("Faire une offre");
});
