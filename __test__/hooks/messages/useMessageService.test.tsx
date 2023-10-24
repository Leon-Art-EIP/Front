import { renderHook, act } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { MessageService, useMessageService } from "../../../src/hooks/messages/useMessageService";
import { ConversationService, useConversationService } from "../../../src/hooks/messages/useConversationService";

describe("useMessageService", () => {
  let conversationService: ConversationService;
  let container: MessageService;

  beforeEach(() => {
    conversationService = renderHook(() => useConversationService()).result.current;
    container = renderHook(() => useMessageService(conversationService)).result.current;
  });

  test("should send a message", () => {
    act(() => {
      container.sendMessage(0, "Hello");
    });
  });
});
