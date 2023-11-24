import { find } from "../find";
import { start } from "../start";

describe("parametersPageContent.cy.ts", () => {
  it("should test parametersPage", () => {
    start("/settings");
    find("Page de paramètres");
  });
});
