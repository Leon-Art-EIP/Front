import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import PostArtPublication from "../../src/components/posts/PostArtPublication";

test("Post deleteLoading snapshot", () => {
  testSnapshot(
    <PostArtPublication
      artPublication={{
        _id: "1",
        image: "image.jpg",
      }}
    />
  );
});
