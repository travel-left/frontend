import faker from 'faker'

describe('Sign up with existing account', function () {
    it('Checks for users name after signed up', function () {
        cy.visit('/')
        cy.url().should('include', '/signup')
        cy.get('input[name="name"]')
            .type('Test User')
        cy.get('input[name="email"]')
            .type(faker.internet.email())
        cy.get('input[name="password"]')
            .type('password')
        cy.get('button[id="signup"]').click()
        cy.url().should('include', '/trips')
        cy.contains('Test User').should('be.visible')
    })
})