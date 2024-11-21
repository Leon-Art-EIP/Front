import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import TestFormComponent from "../useful/TestFormComponent";
import FileInput from "../../src/components/form/FileInput";

test("FileInput snapshot", () => {
  testSnapshot(
    <TestFormComponent name="file">
      <FileInput name="file" />
    </TestFormComponent>
  );
});
