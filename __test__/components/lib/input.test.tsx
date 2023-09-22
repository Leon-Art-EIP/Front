import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Input } from "../../../src/components/lib/lib";

test("Input test", () => {
  const { container } = render(
    <Input name="input" onChange={() => {}} placeholder="input" type="input" value="input" />
  );

  expect(container).toBeDefined();
});
