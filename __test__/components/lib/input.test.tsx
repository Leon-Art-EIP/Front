import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Input } from "../../../src/components/lib/lib";

test("Input test", () => {
  const { container } = render(
    <Input name="input" onChange={() => {}} placeholder="input" type="input" value="input" id="test-input" />
  );

  expect(container).toBeDefined();

  const inputElement = container.querySelector("#test-input");

  if (inputElement) fireEvent.change(inputElement, { target: { value: "new value" } });
});
