import { LoremIpsum } from "lorem-ipsum"
import loginAfterSeed from "./util/loginAfterSeed"

const lorem = new LoremIpsum({
    wordsPerSentence: {
        max: 16,
        min: 4
    }
})

describe('create new trip', () => {
    loginAfterSeed()
    const email = 'admin@admin.com'
    const tripName = lorem.generateWords(3)
    const description = lorem.generateSentences(1)
    let month = (new Date()).getMonth() + 1
    month = month.toString().length === 1 ? `0${month}` : month
    const year = (new Date()).getFullYear()
    const startDay = 11
    const endDay = 15
    const start = `${month}-${startDay}-${year}`
    const end = `${month}-${endDay}-${year}`

    it('check trip name, coordinator email and trip dates', function () {
        cy.get('button[id="new-trip-button"]').click()
        cy.get('input[name="name"]')
            .type(tripName)
        cy.get('input[name="description"]')
            .type(description)
        cy.get('input[name="dateStart"]')
            .clear()
        cy.get('p').contains(startDay).click()
        cy.get('input[name="dateEnd"]')
            .clear()
        cy.get('p').contains(endDay).click()
        cy.get('button[type="submit"]')
            .click()
        cy.contains(tripName).dblclick()
        cy.get('span[id="trip-name"]').should('contain', tripName)
        cy.get('span[id="coordinator-email"]').should('contain', email)
        cy.get('button[id="tripDates"]').click()
        cy.get('input[name="dateStart"]').should('have.attr', 'value', start)
        cy.get('input[name="dateEnd"]').should('have.attr', 'value', end)
    })
})