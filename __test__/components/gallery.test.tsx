import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Gallery from "../../src/components/gallery";

test("Gallery snapshot", () => {
  testSnapshot(<Gallery redirectText="Test" redirectUrl="https://test.com" />);
});
