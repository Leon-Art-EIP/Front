import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Input } from "../../src/components/lib";

test("Input snapshot - Basic usage", () => {
  testSnapshot(<Input type="text" value="Test value" placeHolder="Enter text" label="Text Input" />);
});

test("Input snapshot - Required input", () => {
  testSnapshot(<Input type="email" required label="Email" />);
});

test("Input snapshot - Disabled input", () => {
  testSnapshot(<Input type="text" value="Disabled" disabled label="Disabled Input" />);
});

test("Input snapshot - Without label", () => {
  testSnapshot(<Input type="text" value="No label" placeHolder="Placeholder only" />);
});

test("Input snapshot - Custom className", () => {
  testSnapshot(<Input type="number" value={123} className="custom-class" label="Number Input" />);
});
