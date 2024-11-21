import { test } from "vitest";
import StatusBadge from "../../src/components/order/StatusBadge";
import { testSnapshot } from "../function/utils";

test("StatusBadge snapshot - open state", () => {
  testSnapshot(<StatusBadge text="Open" count={5} isOpen={true} />);
});

test("StatusBadge snapshot - closed state", () => {
  testSnapshot(<StatusBadge text="Closed" count={10} isOpen={false} />);
});
