import { find } from "../find";
import { start } from "../start";

describe('loginPageContent.cy.ts', () => {
  it('should contain the Leon\'Art logo', () => {
    start('/login');
    cy.get('.leon-title').should('contain', 'Leon');
    cy.get('.art-title').should('contain', 'Art');
  });

  it('should contain "not registered yet ?"', () => {
    start('/login');
    cy.get('[title="register"]').should('contain', 'S\'enregistrer');
  });
});

