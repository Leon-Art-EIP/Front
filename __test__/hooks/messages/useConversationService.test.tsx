import { renderHook, act } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { ConversationService, useConversationService } from "../../../src/hooks/messages/useConversationService";

describe("useConversationService", () => {
  let container: ConversationService;

  beforeEach(() => {
    container = renderHook(() => useConversationService()).result.current;
  });

  test("should select the conv when use the selectconv function", () => {
    act(() => {
      container.selectConversation(1);
    });
  });
});
