import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import LoadingPage from "../../src/components/loading/LoadingPage";

test("LoadingPage snapshot", () => {
  testSnapshot(<LoadingPage />);
});
