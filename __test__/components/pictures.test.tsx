import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Pictures from "../../src/components/gallery/Pictures";

test("Pictures empty snapshot", () => {
  testSnapshot(<Pictures pictures={[]} />);
});

test("Pictures snapshot", () => {
  testSnapshot(<Pictures pictures={["test1", "test2", "test3"]} />);
});
