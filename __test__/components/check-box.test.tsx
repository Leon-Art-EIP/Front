import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import Checkbox from "../../src/components/form/Checkbox";

test("Checkbox snapshot", () => {
  testSnapshot(
    <TestFormComponent name="checkbox">
      <Checkbox name="checkbox" />
    </TestFormComponent>
  );
});
