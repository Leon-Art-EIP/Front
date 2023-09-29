import { start } from "../start";

describe('Reset Password Form Validation', () => {
  it('should not reset password when no fields are filled', () => {
    start('/reset_password/token_exemple');
    cy.get('button[name="reset"]').click();
    cy.get('.error-message').should('contain', 'Veuillez remplir tous les champs.');
  });

  it('should not reset password when passwords do not match', () => {
    start('/reset_password/token_exemple');
    cy.get('input[name="newPassword"]').type('password123');
    cy.get('input[name="confirmNewPassword"]').type('differentpassword');
    cy.get('button[name="reset"]').click();
    cy.get('.error-message').should('contain', 'Les mots de passe ne correspondent pas.');
  });

  it('should not reset password when password is weak', () => {
    start('/reset_password/token_exemple');
    cy.get('input[name="newPassword"]').type('weakpassword');
    cy.get('input[name="confirmNewPassword"]').type('weakpassword');
    cy.get('button[name="reset"]').click();
    cy.get('.error-message').should('contain', 'Le mot de passe n\'est pas assez puissant.');
  });

  it('should reset password when all fields are correctly filled', () => {
    start('/reset_password/token_exemple');
    cy.get('input[name="newPassword"]').type('StrongPassword123');
    cy.get('input[name="confirmNewPassword"]').type('StrongPassword123');
    cy.get('button[name="reset"]').click();
  });
});
