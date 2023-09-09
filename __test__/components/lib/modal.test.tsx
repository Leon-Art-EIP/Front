import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Modal } from "../../../src/components/lib/lib";

test("Modal success test", () => {
  const { container } = render(
    <Modal handleClose={() => {}} isOpen>
      <div>enfant</div>
    </Modal>
  );

  expect(container.textContent).toContain("enfant");
});
