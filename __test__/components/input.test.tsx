import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import Input from "../../src/components/form/Input";

test("Input snapshot", () => {
  testSnapshot(
    <TestFormComponent name="input">
      <Input name="input" placeholder="Saisissez" type="text" />
    </TestFormComponent>
  );
});
