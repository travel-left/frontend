import loginAfterSeed from "../Util/loginAfterSeed"

const url = 'https://images.unsplash.com/photo-1513377888081-794d8e958972?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'

describe('change dates of trip', () => {
    loginAfterSeed()

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should change cover photo', function () {
        cy.get('h1').contains('Change Cover Photo').click()
        cy.get('input[name="link"]')
            .type(url)
        cy.get('button[type="submit"]').click()
        cy.get('.Cover-image').should('have.css', 'background-image', 'url("https://images.unsplash.com/photo-1513377888081-794d8e958972?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")')
    })
})