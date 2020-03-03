import loginAfterSeed from '../Util/loginAfterSeed'

describe('int test saved events', () => {
    loginAfterSeed()
    let month = (new Date()).getMonth() + 1
    month = month.toString().length === 1 ? `0${month}` : month
    const year = (new Date()).getFullYear()
    const startDay = 11
    const endDay = 15
    const start = `${month}-${startDay}-${year}`
    const editedDay = 15
    const editedDate = `${month}-${editedDay}-${year}`

    it('goes into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('saves an event', function () {
        cy.get('div[id="itinerary-section"]').click()
        cy.get('h2[id="activity-name"]').contains('Fly to London').parent().parent().next().next().next().children().first().click()
        cy.get('h6[id="saved-activity-name"').should('contain', 'Fly to London')
    })

    it('adds a saved event to itinerary', function () {
        cy.get('h6[id="saved-activity-name"').contains('Fly to London').next().click({ force: true })
        cy.get('h6:contains("Fly to London")').should('have.length', 2)
    })

    it('should remove a saved event', function () {
        cy.get('h2[id="activity-name"]').contains('Fly to London').parent().parent().next().next().next().children().first().click()
        cy.get('span[id="star"]').should('have.length', 1)
    })

})