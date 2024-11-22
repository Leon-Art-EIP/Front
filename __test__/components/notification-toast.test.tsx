import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { NotificationToast } from "../../src/components/lib";

test("NotificationToast snapshot - Success message", () => {
  testSnapshot(
    <NotificationToast message="Operation completed successfully." type="success" closeNotification={() => {}} />
  );
});

test("NotificationToast snapshot - Error message", () => {
  testSnapshot(
    <NotificationToast
      message="An error occurred while processing your request."
      type="error"
      closeNotification={() => {}}
    />
  );
});
