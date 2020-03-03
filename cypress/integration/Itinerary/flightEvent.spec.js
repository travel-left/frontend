import loginAfterSeed from '../Util/loginAfterSeed'

describe('creates a flight event', () => {
    loginAfterSeed()
    let month = (new Date()).getMonth() + 1
    month = month.toString().length === 1 ? `0${month}` : month
    const year = (new Date()).getFullYear()
    const startDay = 11
    const endDay = 15
    const start = `${month}-${startDay}-${year}`
    const editedDay = 15
    const editedDate = `${month}-${editedDay}-${year}`
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
        cy.get('div[id="itinerary-section"]').click()
        cy.get('button[id="new-activity"]').click()
        cy.get('input[name="dateStart"]')
            .clear()
        cy.get('p').contains(startDay).click()
        cy.contains('Flight').click()
        cy.get('input[id="airline"]').type(e.airline).type('{enter}')
        cy.get('input[name="flightNumber"]').click().type(e.flightNumber)
        cy.get('button[id="event-submit-button"]')
            .click()

        cy.get('.MuiCard-root').should('contain', e.name)
        cy.get('.MuiCard-root').should('contain', e.startTime + ' - ' + e.endTime)
        cy.get('.MuiCard-root').should('contain', e.location)
    })

})