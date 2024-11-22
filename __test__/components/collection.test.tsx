import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Collection from "../../src/components/single-art-page/artwork/Collection";
import { ICollectionArtsExtended } from "../../src/interfaces/single/collection";

const collection: ICollectionArtsExtended = {
  _id: "1",
  name: "Collection name",
  artPublications: [
    {
      _id: "1",
      userId: "1",
      image: "image",
      artType: "artType",
      name: "name",
      description: "description",
      isForSale: "true",
      isSold: false,
      price: 100,
      location: "location",
      likes: ["1"],
      totalLikes: 1,
      comments: ["1"],
    },
  ],
  isPublic: true,
  userId: "1",
};

test("Collection snapshot", () => {
  testSnapshot(<Collection handleSelectCollection={() => {}} selected={false} collection={collection} />);
});

test("Collection selected snapshot", () => {
  testSnapshot(<Collection handleSelectCollection={() => {}} selected={true} collection={collection} />);
});
