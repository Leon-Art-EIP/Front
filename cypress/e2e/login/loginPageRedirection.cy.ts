import { find } from "../find";
import { start } from "../start";

describe('loginPageRedirection.cy.ts', () => {
    it('should contain "Vous n\'avez pas de compte ?"', () => {
      cy.visit('/login');
      cy.contains('Vous n\'avez pas de compte ?').should('be.visible');
    });
  
    it('should redirect to register page', () => {
      cy.visit('/login');
      cy.get('a[title="register"]').click();
      cy.url().should('include', '/register');
    });

    it('should redirect to appropriate URL on button click', () => {
      cy.visit('/login');
      cy.get('.redirection-button').click();
      cy.url().should('include', '/register');
    });
  });
  
