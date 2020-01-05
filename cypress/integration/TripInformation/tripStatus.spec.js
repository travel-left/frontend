import loginAfterSeed from "../Util/loginAfterSeed"

describe('change trip status', () => {
    loginAfterSeed()

    const newStatus = 'LEFT'

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should change trip status', function () {
        cy.get('span').contains('PLANNING').click()
        cy.get('input[name="status"]').parent()
            .click()
        cy.contains(newStatus).click()
        cy.get('button[type="submit"]').click()
        cy.get('span').should('contain', newStatus)
    })
})