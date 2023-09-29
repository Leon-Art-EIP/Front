import { start } from "../start";

describe('Reset Password Page Redirection', () => {
  it('should contain "Réinitialiser votre mot de passe"', () => {
    start('/reset_password/token_exemple');
    cy.contains('Réinitialiser votre mot de passe').should('be.visible');
  });
});