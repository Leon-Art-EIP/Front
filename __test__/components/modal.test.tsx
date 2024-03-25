import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Modal } from "../../src/components/lib";

test("Modal snapshot - Closed state", () => {
  testSnapshot(
    <Modal isOpen={false} handleClose={() => {}}>
      <div>Closed modal</div>
    </Modal>
  );
});

test("Modal snapshot - Open state with content", () => {
  testSnapshot(
    <Modal isOpen={true} handleClose={() => {}}>
      <div>Modal content</div>
    </Modal>
  );
});

test("Modal snapshot - Custom child content", () => {
  testSnapshot(
    <Modal isOpen={true} handleClose={() => {}}>
      <div className="p-4 bg-gray-200 rounded-lg">Custom child content</div>
    </Modal>
  );
});
