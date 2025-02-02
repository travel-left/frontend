import loginAfterSeed from '../Util/loginAfterSeed'

describe('Change name of trip', () => {
    loginAfterSeed()
    const tripName = 'South Africa'
    const tripDescription = 'South Africa surf trip with the lads'

    it('go into trip', () => {
        cy.contains(tripName).dblclick()
    })

    it('change trip name', function () {
        cy.get('button[id="tripInfo-name-button"]').click()
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type(tripName + ' edited')
        cy.get('input[name="description"]').clear()
        cy.get('input[name="description"]').type(tripDescription)
        cy.get('button[type="submit"]')
            .click()
        cy.get('span[id="trip-name"]').should('contain', tripName + ' edited')
        cy.get('h6[id="trip-description"]').should('contain', tripDescription)
    })

})