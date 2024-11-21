import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TextLogo from "../../src/components/text-logo/TextLogo";

test("TextLogo snapshot", () => {
  testSnapshot(<TextLogo />);
});
