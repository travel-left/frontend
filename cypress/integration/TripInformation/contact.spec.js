import faker from 'faker'
import loginAfterSeed from '../Util/loginAfterSeed'

describe('Add, edit and remove a contact from a trip', () => {
    loginAfterSeed()

    const email = faker.internet.email()
    const c = {
        name: 'Test Contact',
        email,
        phone: '559-393-5872',
        nameEdited: 'Test Contact edited',
        emailEdited: email + 'edited',
        phoneEdited: '559-393-5873'
    }

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('add a contact', function () {
        cy.get('button[id="add-new-contact-button"]').click()
        cy.get('input[name="name"]')
            .type(c.name)
        cy.get('input[name="email"]')
            .type(c.email)
        cy.get('input[name="phone"]')
            .type(c.phone)
        cy.get('button[type="submit"]').click()
        cy.get('span[id="contact-email"]').should('contain', c.email)
    })

    it('should edit a contact', function () {
        cy.get('button[id="contact-edit-button"]').parent().contains(c.email).parent().next().click()
        cy.get('input[name="name"]')
            .clear()
            .type(c.nameEdited)
        cy.get('input[name="email"]')
            .clear()
            .type(c.emailEdited)
        cy.get('input[name="phone"]')
            .clear()
            .type(c.phoneEdited)
        cy.get('button[type="submit"]').click()
        cy.get('span[id="contact-email"]').should('contain', c.emailEdited)

    })

    it('remove a contact', function () {
        cy.get('button[id="contact-edit-button"]').parent().contains(c.email).parent().next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.get('span[id="contact-email"]').should('not.contain', c.email)
    })
})