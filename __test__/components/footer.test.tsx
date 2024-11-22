import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Footer from "../../src/components/home/Footer";

test("Footer snapshot", () => {
  testSnapshot(<Footer />);
});
