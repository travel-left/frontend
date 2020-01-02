import loginAfterSeed from '../Util/loginAfterSeed'

describe('Change name of trip', () => {
    loginAfterSeed()
    const tripName = 'South Africa'

    it('go into trip', () => {
        cy.contains(tripName).dblclick()
    })

    it('change trip name', function () {
        cy.get('.TripInfo-name').click()
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type(tripName + ' edited')
        cy.get('button[type="submit"]')
            .click()
        cy.get('.TripInfo-name').should('contain', tripName + ' edited')

    })

})