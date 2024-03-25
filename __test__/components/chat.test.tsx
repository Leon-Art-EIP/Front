import { test } from "vitest";
import { testSnapshot } from "../function/utils";
import { Chat } from "../../src/components/chat/messages/Chat";

test("Chat sender 0 snapshot", () => {
  testSnapshot(<Chat content="content" dateTime="dateTime" sender={0} />);
});

test("Chat sender 1 snapshot", () => {
  testSnapshot(<Chat content="content" dateTime="dateTime" sender={1} />);
});
