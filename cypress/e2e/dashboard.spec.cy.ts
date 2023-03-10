/// <reference types="cypress" />
describe('DashBoard', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Email"]').type('userA@gmail.com')
    cy.get('input[placeholder="Password"]').type('aaaaaa')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('Shall Post/Comment CRUD works fine', () => {
    cy.wait(1000)
    cy.get('input[placeholder="New post ?"]').type('Post A')
    cy.get('[data-testid="btn-post"]').click()
    cy.wait(500)
    cy.get('[data-testid="ul-post"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-post"]').children().should('have.text', 'Post A')
    cy.get('[data-testid="pencil-post"]').click()
    cy.get('input[placeholder="New post ?"]').type('++')
    cy.get('[data-testid="btn-post"]').click()
    cy.get('[data-testid="ul-post"]').children().should('have.text', 'Post A++')
    cy.get('[data-testid="open-comments"]').click()
    cy.wait(500)
    cy.get('input[placeholder="New comment ?"]').should('be.visible')
    cy.get('input[placeholder="New comment ?"]').type('Comment A')
    cy.get('[data-testid="btn-comment"]').click()
    cy.get('[data-testid="ul-comment"]').children().should('have.length', 1)
    cy.get('[data-testid="pencil-comment"]').click()
    cy.get('input[placeholder="New comment ?"]').type('++')
    cy.get('[data-testid="btn-comment"]').click()
    cy.get('[data-testid="ul-comment"]')
      .children()
      .should('have.text', 'Comment A++')
    cy.get('[data-testid="trash-post"]').click()
    cy.get('[data-testid="ul-post"]').children().should('have.length', 0)
  })

  it('Shall Notice CRUD works fine', () => {
    cy.wait(1000)
    cy.get('input[placeholder="New notice ?"]').type('Notice A')
    cy.get('[data-testid="btn-notice"]').click()
    cy.get('[data-testid="ul-notice"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .should('have.text', 'Notice A')
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .find('svg:first-child')
      .click()
    cy.get('input[placeholder="New notice ?"]').type('++')
    cy.get('[data-testid="btn-notice"]').click()
    cy.wait(500)
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .should('have.text', 'Notice A++')
    cy.get('[data-testid="ul-notice"]')
      .children()
      .first()
      .find('svg:last-child')
      .click()
    cy.get('[data-testid="ul-notice"]').children().should('have.length', 0)
  })
})
export {}
