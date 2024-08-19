import { find } from "../find";
import { start } from "../start";

describe("chatPageContent.cy.ts", () => {
  it("should test messagesPage", () => {
    start("/chat");
    find("Page de messages");
  });
});
