import loginAfterSeed from "../Util/loginAfterSeed"

describe('create new trip', () => {
    loginAfterSeed()
    const tripDate = {
        name: 'New trip date test',
        date: '01-02-2020',
        dateLong: 'January 02',
        nameEdited: 'New trip date test edited',
        editedDate: '02-02-2020',
        editedDateLong: 'February 02',

    }

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('new trip date', function () {
        cy.get('.add-new-trip-date-button').click()
        cy.get('input[name="name"]')
            .type(tripDate.name)
        cy.get('input[name="date"]')
            .clear()
            .type(tripDate.date)
        cy.get('input[name="category"]').parent()
            .click()
        cy.contains('Paperwork Date').click()
        cy.get('button[type="submit"]')
            .click()
        cy.contains(tripDate.name).should('be.visible')
        cy.contains(tripDate.dateLong).should('be.visible')
        cy.get('.TripDate-Icon').contains('folder_open').should('be.visible')
    })

    it('edit trip date', () => {
        cy.get('.edit-trip-date-button').parent().contains(tripDate.name).parent().parent().next().click()
        cy.get('input[name="name"]')
            .clear()
            .type(tripDate.nameEdited)
        cy.get('input[name="date"]')
            .clear()
            .type(tripDate.editedDate)
        cy.get('input[name="category"]').parent()
            .click()
        cy.contains('Money Date').click()
        cy.get('button[type="submit"]')
            .click()
        cy.contains(tripDate.nameEdited).should('be.visible')
        cy.contains(tripDate.editedDateLong).should('be.visible')
        cy.get('.TripDate-Icon').contains('attach_money').should('be.visible')
    })

    it('delete trip date', () => {
        cy.get('.edit-trip-date-button').parent().contains(tripDate.nameEdited).parent().parent().next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.contains(tripDate.nameEdited).should('not.be.visible')
    })

})