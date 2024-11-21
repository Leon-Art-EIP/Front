import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TitledLabel from "../../src/components/label/TitledLabel";

test("IconLabel snapshot", () => {
  testSnapshot(<TitledLabel text="test" title="test" />);
});

test("IconLabel underline snapshot", () => {
  testSnapshot(<TitledLabel text="test" title="test" underline />);
});

test("IconLabel capitalize snapshot", () => {
  testSnapshot(<TitledLabel text="test" title="test" capitalize />);
});
