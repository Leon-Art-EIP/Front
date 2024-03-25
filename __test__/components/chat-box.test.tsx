import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { ChatBox } from "../../src/components/chat/messages/ChatBox";

test("ChatBox snapshot", () => {
  testSnapshot(<ChatBox />);
});
