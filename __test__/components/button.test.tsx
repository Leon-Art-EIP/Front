import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Button } from "../../src/components/lib";

test("Button danger snapshot", () => {
  testSnapshot(
    <Button color="danger" type="button">
      test
    </Button>
  );
});

test("Button info snapshot", () => {
  testSnapshot(
    <Button color="info" type="button">
      test
    </Button>
  );
});

test("Button primary snapshot", () => {
  testSnapshot(
    <Button color="primary" type="button">
      test
    </Button>
  );
});

test("Button secondary snapshot", () => {
  testSnapshot(
    <Button color="secondary" type="button">
      test
    </Button>
  );
});

test("Button success snapshot", () => {
  testSnapshot(
    <Button color="success" type="button">
      test
    </Button>
  );
});
