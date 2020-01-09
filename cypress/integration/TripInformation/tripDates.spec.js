import loginAfterSeed from "../Util/loginAfterSeed"

const startDate = '01-02-2020'
const endDate = '12-30-2021'

describe('change dates of trip', () => {
    loginAfterSeed()

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should change trip dates', function () {
        cy.get('button[id="tripDates"]').click()
        cy.get('input[name="dateStart"]')
            .clear()
            .type(startDate)
        cy.get('input[name="dateEnd"]')
            .clear()
            .type(endDate)
        cy.get('button[type="submit"]')
            .click()
        cy.get('span').should('contain', 'January 02')
        cy.get('span').should('contain', 'December 30')
    })
})