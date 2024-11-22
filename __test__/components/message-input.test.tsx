import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { MessageInput } from "../../src/components/chat/messages/MessageInput";

test("ChatBox snapshot", () => {
  testSnapshot(<MessageInput handleSendMsg={() => {}} />);
});
