import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import Select from "../../src/components/form/Select";

test("Select snapshot", () => {
  testSnapshot(
    <TestFormComponent name="options">
      <Select
        name="options"
        options={[
          {
            label: "Option 1",
            value: "option1",
            selected: true,
          },
          {
            label: "Option 2",
            value: "option2",
            selected: false,
          },
        ]}
      />
    </TestFormComponent>
  );
});
