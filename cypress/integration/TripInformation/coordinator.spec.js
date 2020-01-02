import faker from 'faker'
import loginAfterSeed from '../Util/loginAfterSeed'

describe('Add and remove coordinator from trip', () => {
    loginAfterSeed()

    const c = {
        name: 'Test Coordinator',
        email: faker.internet.email(),
        phone: '559-393-5872',
        title: 'TCO'
    }

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('add a coordinator to a trip', function () {
        cy.get('.add-new-coordinator-button').click()
        cy.get('input[name="name"]')
            .type(c.name)
        cy.get('input[name="email"]')
            .type(c.email)
        cy.get('input[name="phone"]')
            .type(c.phone)
        cy.get('input[name="title"]')
            .type(c.title)
        cy.get('button[type="submit"]').click()
        cy.get('.Coordinator-info').should('contain', c.email)
    })

    it('remove a coordinator from a trip', function () {
        cy.get('.coordinator-edit-button').parent().contains(c.email).parent().next().click()
        cy.get('button[type="submit"]').click()
        cy.get('.Coordinator-info').should('not.contain', c.email)
    })
})