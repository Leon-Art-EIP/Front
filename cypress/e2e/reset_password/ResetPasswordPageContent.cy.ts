import { start } from "../start";

describe('Reset Password Page Content', () => {
  it('should display the Leon\'Art logo', () => {
    start('/reset_password/token_exemple');
    cy.get('.leon-title').should('contain', 'Leon');
    cy.get('.art-title').should('contain', 'Art');
  });

  it('should contain "Réinitialiser votre mot de passe"', () => {
    start('/reset_password/token_exemple');
    cy.get('label').should('contain', 'Réinitialiser votre mot de passe');
  });
});
