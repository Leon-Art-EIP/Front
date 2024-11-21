import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import TextArea from "../../src/components/form/TextArea";

test("TextArea snapshot", () => {
  testSnapshot(
    <TestFormComponent name="input">
      <TextArea name="input" />
    </TestFormComponent>
  );
});
