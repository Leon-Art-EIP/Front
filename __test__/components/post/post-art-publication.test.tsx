import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import PostArtPublication from "../../../src/components/posts/PostArtPublication";

test("PostArtPublication component test", () => {
  const { container } = render(
    <PostArtPublication
      artPublication={{
        _id: "123",
        image: "image.jpg",
      }}
    />
  );

  expect(container).not.toBeNull();
});
