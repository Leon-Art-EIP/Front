/// <reference types="cypress" />

// -- This is a parent command --
Cypress.Commands.add("start", () => {
  it("should visit website", () => {
    cy.visit("http://localhost:3000");
  });
})

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore uncaught promise rejections
  return false;
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {}
