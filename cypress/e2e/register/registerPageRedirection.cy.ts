import { find } from "../find";
import { start } from "../start";

describe('registerPageRedirection.cy.ts', () => {
    it('should contain "Vous avez déjà un compte ?"', () => {
      cy.visit('/register');
      cy.contains('Vous avez déjà un compte ?').should('be.visible');
    });
  
    it('should redirect to login page', () => {
      cy.visit('/register');
      cy.get('a[title="login"]').click();
      cy.url().should('include', '/login');
    });

    it('should redirect to appropriate URL on button click', () => {
      cy.visit('/register');
      cy.get('.redirection-button').click();
      cy.url().should('include', '/login');
    });
  });
  
