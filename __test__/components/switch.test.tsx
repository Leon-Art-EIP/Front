import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Switch from "../../src/components/lib/Button/Switch";

test("Switch snapshot - Checked", () => {
  testSnapshot(<Switch checked={true} onChange={() => {}} label="Switch activé" className="custom-class" />);
});

test("Switch snapshot - Unchecked", () => {
  testSnapshot(<Switch checked={false} onChange={() => {}} label="Switch désactivé" />);
});

test("Switch snapshot - Disabled", () => {
  testSnapshot(<Switch checked={true} onChange={() => {}} isDisabled={true} label="Switch désactivé" />);
});

test("Switch snapshot - Loading", () => {
  testSnapshot(<Switch checked={false} onChange={() => {}} isLoading={true} label="Switch en chargement" />);
});
