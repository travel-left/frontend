import loginAfterSeed from '../Util/loginAfterSeed'

describe('Change name of trip', () => {
    loginAfterSeed()
    const tripName = 'South Africa'
    const tripDescription = 'South Africa surf trip with the lads'

    it('go into trip', () => {
        cy.contains(tripName).dblclick()
    })

    it('change trip name', function () {
        cy.get('.TripInfo-name').click()
        cy.get('input[name="name"]').clear()
        cy.get('input[name="name"]').type(tripName + ' edited')
        cy.get('input[name="description"]').clear()
        cy.get('input[name="description"]').type(tripDescription)
        cy.get('button[type="submit"]')
            .click()
        cy.get('.TripInfo-name').should('contain', tripName + ' edited')
        cy.get('.TripInfo-descript').should('contain', tripDescription)

    })

})