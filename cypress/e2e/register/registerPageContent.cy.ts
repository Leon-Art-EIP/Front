import { find } from "../find";
import { start } from "../start";

describe('registerPageContent.cy.ts', () => {
  it('should contain the Leon\'Art logo', () => {
    start('/register');
    cy.get('.leon-title').should('contain', 'Leon');
    cy.get('.art-title').should('contain', 'Art');
  });

  it('should contain "already registered ?"', () => {
    start('/register');
    cy.get('[title="login"]').should('contain', 'Se connecter');
  });
});

