import { find } from "../find";
import { start } from "../start";

describe('forgottenPasswordPageMissingField.cy.ts', () => {
  it('should successfully reset password when the field is correctly filled', () => {
    start('/forgotten_password');
    cy.get('input[name="email"]').type('example@example.com');
    cy.get('button[name="reset"]').click();
  });

  it('should not reset password when no field is filled', () => {
    start('/forgotten_password');
    cy.wait(1000);
    cy.get('button[name="reset"]').click().then(() => {
      find('Veuillez remplir le champ.');
    });
  });

  it('should not reset password when email is invalid', () => {
    start('/forgotten_password');
    cy.get('input[name="email"]').type('invalidemail@ezaeaz');
    cy.get('button[name="reset"]').click().then(() => {
      find('Adresse email invalide.');
    });
  });
});

