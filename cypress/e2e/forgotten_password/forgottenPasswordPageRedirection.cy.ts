import { start } from "../start";

describe('forgottenPasswordPageRedirection.cy.ts', () => {
  it('should contain "Vous n\'avez pas de compte ?"', () => {
    start('/forgotten_password');
    cy.contains('Vous vous souvenez du mot de passe ?').should('be.visible');
  });

  it('should redirect to login page', () => {
    start('/forgotten_password');
    cy.get('a[title="login"]').click();
    cy.url().should('include', '/login');
  });
});