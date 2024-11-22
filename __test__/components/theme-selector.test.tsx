import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import ThemeSelector from "../../src/components/theme/ThemeSelector";

test("ThemeSelector snapshot", () => {
  testSnapshot(<ThemeSelector />);
});
