import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import NumberInput from "../../src/components/form/NumberInput";

test("NumberInput snapshot", () => {
  testSnapshot(
    <TestFormComponent name="number">
      <NumberInput name="number" className="bg-white" />
    </TestFormComponent>
  );
});
