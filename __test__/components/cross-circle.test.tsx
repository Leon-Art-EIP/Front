import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import CrossCircle from "../../src/components/animated/cross-circle";

test("CrossCircle snapshot", () => {
  testSnapshot(<CrossCircle />);
});
