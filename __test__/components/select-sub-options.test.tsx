import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import SelectSubOptions from "../../src/components/form/SelectSubOptions";

test("SelectSubOptions snapshot", () => {
  testSnapshot(
    <TestFormComponent name="options">
      <SelectSubOptions
        name="options"
        options={[
          {
            collapsed: false,
            label: "Option 1",
            value: "option1",
            subOptions: [
              { label: "Sub Option 1", value: "suboption1", selected: false },
              { label: "Sub Option 2", value: "suboption2", selected: false },
            ],
          },
        ]}
      />
    </TestFormComponent>
  );
});
