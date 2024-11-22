import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import ImageCropper from "../../src/components/image/ImageCropper";

test("ImageCropper profile picture snapshot", () => {
  testSnapshot(
    <ImageCropper
      changeProfile={() => Promise.resolve()}
      closeModal={() => {}}
      name="profilePicture"
      type="profilePicture"
    />
  );
});

test("ImageCropper banner picture snapshot", () => {
  testSnapshot(
    <ImageCropper
      changeProfile={() => Promise.resolve()}
      closeModal={() => {}}
      name="bannerPicture"
      type="bannerPicture"
    />
  );
});
