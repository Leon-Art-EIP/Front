import { find } from "../find";
import { start } from "../start";

describe("registerPageMissingFields.cy.ts", () => {
  it("should successfully register when all fields are correctly filled", () => {
    start("/register");
    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[name="register"]').click();
  });

  it("should not register when no field is filled", () => {
    start("/register");
    cy.wait(1000);
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Veuillez remplir tous les champs.");
      });
  });

  it("should not register when only username is filled", () => {
    start("/register");
    cy.get('input[name="username"]').type("myusername");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Veuillez remplir tous les champs.");
      });
  });

  it("should not register when only email is filled", () => {
    start("/register");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Veuillez remplir tous les champs.");
      });
  });

  it("should not register when only password is filled", () => {
    start("/register");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Veuillez remplir tous les champs.");
      });
  });

  it("should not register when email is invalid", () => {
    start("/register");
    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="email"]').type("invalidemail@ezaeaz");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Adresse email invalide.");
      });
  });

  it("should not register when password is too short", () => {
    start("/register");
    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("short");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Mot de passe invalide.");
      });
  });

  it("should not register when password is too long", () => {
    start("/register");
    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="email"]').type("example@example.com");
    let longPassword = "a".repeat(41);
    cy.get('input[name="password"]').type(longPassword);
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Mot de passe invalide.");
      });
  });

  it("should not register when username is too long", () => {
    start("/register");
    let longUsername = "a".repeat(21);
    cy.get('input[name="username"]').type(longUsername);
    cy.get('input[name="email"]').type("example@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[name="register"]')
      .click()
      .then(() => {
        find("Nom d'utilisateur invalide.");
      });
  });
});
