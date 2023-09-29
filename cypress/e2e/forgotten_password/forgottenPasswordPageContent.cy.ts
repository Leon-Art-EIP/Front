import { start } from "../start";

describe('forgottenPasswordPageContent.cy.ts', () => {
  it('should contain the Leon\'Art logo', () => {
    start('/forgotten_password');
    cy.get('.leon-title').should('contain', 'Leon');
    cy.get('.art-title').should('contain', 'Art');
  });

  it('should contain "not registered yet ?"', () => {
    start('/forgotten_password');
    cy.get('[title="login"]').should('contain', 'S\'identifier');
  });
});

