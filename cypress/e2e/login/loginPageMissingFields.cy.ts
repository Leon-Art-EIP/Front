import { find } from "../find";
import { start } from "../start";

describe('loginPageMissingFields.cy.ts', () => {
  it('should successfully login when all fields are correctly filled', () => {
    start('/login');
    cy.get('input[name="email"]').type('example@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[name="login"]').click();
  });

  it('should not login when no field is filled', () => {
    start('/login');
    cy.wait(1000);
    cy.get('button[name="login"]').click().then(() => {
      find('Veuillez remplir tous les champs.');
    });
  });

  it('should not login when only email is filled', () => {
    start('/login');
    cy.get('input[name="email"]').type('example@example.com');
    cy.get('button[name="login"]').click().then(() => {
      find('Veuillez remplir tous les champs.');
    });
  });

  it('should not login when only password is filled', () => {
    start('/login');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[name="login"]').click().then(() => {
      find('Veuillez remplir tous les champs.');
    });
  });

  it('should not login when email is invalid', () => {
    start('/login');
    cy.get('input[name="email"]').type('invalidemail@ezaeaz');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[name="login"]').click().then(() => {
      find('Adresse email invalide.');
    });
  });
});

