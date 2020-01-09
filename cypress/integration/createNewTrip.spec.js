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
    const startDate = '01-01-2020'
    const endDate = '12-31-2021'

    it('check trip name, coordinator email and trip dates', function () {
        cy.get('button[name="new-trip-button"]').click()
        cy.get('input[name="name"]')
            .type(tripName)
        cy.get('input[name="description"]')
            .type(description)
        cy.get('input[name="dateStart"]')
            .clear()
            .type(startDate)
        cy.get('input[name="dateEnd"]')
            .clear()
            .type(endDate)
        cy.get('button[type="submit"]')
            .click()
        cy.contains(tripName).dblclick()
        cy.get('.TripInfo-name').should('contain', tripName)
        cy.get('.Coordinator-info').should('contain', email)
        cy.get('button[id="tripDates"]').click()
        cy.get('input[name="dateStart"]').should('have.attr', 'value', startDate)
        cy.get('input[name="dateEnd"]').should('have.attr', 'value', endDate)
        cy.get('.modal-close-button').click()
    })
})