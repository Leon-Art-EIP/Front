import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Badge } from "../../src/components/lib";

test("Badge snapshot", () => {
  testSnapshot(<Badge text="test" />);
});
