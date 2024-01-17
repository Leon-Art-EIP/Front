import { render, cleanup } from "@testing-library/react";
import React from "react";
import { expect, test, describe, beforeEach, afterEach } from "vitest";
import { Modal } from "../../../src/components/lib/index";

describe("Modal component tests", () => {
  // Nettoyer après chaque test
  afterEach(() => {
    cleanup();
    document.body.classList.remove("overflow-hidden");
  });

  test("should add overflow-hidden to body when isOpen is true", () => {
    render(
      <Modal isOpen handleClose={() => {}}>
        <div>Contenu du modal</div>
      </Modal>
    );

    expect(document.body.classList.contains("overflow-hidden")).toBe(true);
  });

  test("should remove overflow-hidden from body when isOpen is false", () => {
    render(
      <Modal isOpen={false} handleClose={() => {}}>
        <div>Contenu du modal</div>
      </Modal>
    );

    expect(document.body.classList.contains("overflow-hidden")).toBe(false);
  });

  test("should render children when isOpen is true", () => {
    const { getByText } = render(
      <Modal isOpen handleClose={() => {}}>
        <div>Contenu du modal</div>
      </Modal>
    );

    expect(getByText("Contenu du modal")).toBeDefined();
  });

  test("should not render when isOpen is false", () => {
    const { queryByText } = render(
      <Modal isOpen={false} handleClose={() => {}}>
        <div>Contenu du modal</div>
      </Modal>
    );

    expect(queryByText("Contenu du modal")).toBeNull();
  });
});
