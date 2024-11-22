import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import ArticleWrapper from "../../src/wrappers/article/ArticleWrapper";

test("ArticleWrapper snapshot", () => {
  testSnapshot(<ArticleWrapper id="12" />);
});
