import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import CustomSwitch from "../../src/components/buttons/CustomSwitch";

test("CrossCircle checked snapshot", () => {
  testSnapshot(<CustomSwitch checked labelOff="Off" labelOn="On" onChange={() => {}} />);
});

test("CrossCircle not checked snapshot", () => {
  testSnapshot(<CustomSwitch checked={false} labelOff="Off" labelOn="On" onChange={() => {}} />);
});

test("CrossCircle checked tooltip snapshot", () => {
  testSnapshot(<CustomSwitch checked labelOff="Off" labelOn="On" onChange={() => {}} tooltip="tooltip" />);
});

test("CrossCircle not checked tooltip snapshot", () => {
  testSnapshot(<CustomSwitch checked={false} labelOff="Off" labelOn="On" onChange={() => {}} tooltip="tooltip" />);
});
