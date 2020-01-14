import loginAfterSeed from '../Util/loginAfterSeed'

describe('creates a flight event', () => {
    loginAfterSeed()

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should contain flight title and time', function () {
        const e = {
            name: 'Flight: UA32 from LAX to NRT',
            date: '01-10-2020',
            type: 'FLIGHT',
            airline: 'UNITED AIRLINES',
            flightNumber: '32',
            startTime: '11:50 am',
            endTime: '3:00 pm',
            location: 'LAX'
        }
        cy.contains('Manage Itinerary').children().first().click()
        cy.contains('NEW EVENT').click()
        cy.get('input[name="dateStart"]')
            .clear()
            .type(e.date)
        cy.contains('Flight').click()
        cy.get('input[id="airline"]').type(e.airline).type('{enter}')
        cy.get('input[name="flightNumber"]').click().type(e.flightNumber)
        cy.get('.event-submit-button')
            .click()

        cy.get('.MuiCard-root').should('contain', e.name)
        cy.get('.MuiCard-root').should('contain', e.startTime + ' - ' + e.endTime)
        cy.get('.MuiCard-root').should('contain', e.location)
    })

})