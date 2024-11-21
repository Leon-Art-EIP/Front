import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import Messages from "../../src/components/chat/messages/Messages";

test("ChatBox snapshot", () => {
  testSnapshot(<Messages />);
});
