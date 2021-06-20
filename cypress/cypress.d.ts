/// <reference types="Cypress" />

declare namespace Cypress {
  interface Cypress {
    env(key: string): any;
  }
}
