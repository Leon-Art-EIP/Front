import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Category from "../../src/components/profile/category/Category";

test("Category snapshot", () => {
  testSnapshot(<Category category="Acrylique" />);
});
