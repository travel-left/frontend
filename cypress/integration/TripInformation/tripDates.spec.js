import loginAfterSeed from "../Util/loginAfterSeed"

let month = (new Date()).getMonth() + 1
month = month.toString().length === 1 ? `0${month}` : month
const year = (new Date()).getFullYear()
const startDay = 11
const endDay = 15
const start = `${month}-${startDay}-${year}`
const end = `${month}-${endDay}-${year}`

describe('change dates of trip', () => {
    loginAfterSeed()

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should change trip dates', function () {
        cy.get('button[id="tripDates"]').click()
        cy.get('input[name="dateStart"]')
            .clear()
        cy.get('p').contains(startDay).click()
        cy.get('input[name="dateEnd"]')
            .clear()
        cy.get('p').contains(endDay).click()
        cy.get('button[type="submit"]')
            .click()

        cy.wait(500)
        cy.get('button[id="tripDates"]').click()
        cy.get('input[name="dateStart"]').should('have.attr', 'value', start)
        cy.get('input[name="dateEnd"]').should('have.attr', 'value', end)
    })
})