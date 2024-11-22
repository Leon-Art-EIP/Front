import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import CheckCircle from "../../src/components/animated/check-circle";

test("CheckCircle snapshot", () => {
  testSnapshot(<CheckCircle />);
});
