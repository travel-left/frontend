import loginAfterSeed from "../Util/loginAfterSeed"

describe('create new important trip date', () => {
    loginAfterSeed()
    let month = (new Date()).getMonth() + 1
    month = month.toString().length === 1 ? `0${month}` : month
    const year = (new Date()).getFullYear()
    const day = 11
    const editedDay = 15
    const date = `${month}-${day}-${year}`
    const editedDate = `${month}-${editedDay}-${year}`

    const tripDate = {
        name: 'New trip date test',
        date: date,
        dateLong: `${(new Date(date)).toLocaleString('default', { month: 'long' })} ${day}`,
        nameEdited: 'New trip date test edited',
        editedDate: editedDate,
        editedDateLong: `${(new Date(editedDate)).toLocaleString('default', { month: 'long' })} ${editedDay}`,
    }

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('new trip date', function () {
        cy.get('button[id="add-new-trip-date-button"]').click()
        cy.get('input[name="name"]')
            .type(tripDate.name)
        cy.get('input[name="date"]')
            .clear()
        cy.get('p').contains(day).click()
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
        cy.get('p').contains(editedDay).click()
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