/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('When user visit home page', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('host'))
  })

  it('displays three articles and three trips', () => {
    cy.get('[data-test-class="article"]').should('have.length', 3)
    cy.get('[data-test-class="trip"]').should('have.length', 3)
  })
})
