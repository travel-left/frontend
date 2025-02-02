import loginAfterSeed from '../Util/loginAfterSeed'

describe('create, edit, and delete a traveler', () => {
    loginAfterSeed()
    const t = {
        name: 'New Traveler',
        email: 'new@traveler.com',
        phone: '559-393-5872',
        personalNotes: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        status: 'INVITED',
        nameEdited: 'New Traveler2',
        emailEdited: 'new@traveler.com2',
        phoneEdited: '559-393-5873',
        personalNotesEdited: 'Lorem ipsum dolor sit amet consectetur adipisicing.2',
        statusEdited: 'CONFIRMED'
    }

    it('create a traveler', function () {
        cy.get('button[id="travelers-nav"]').click()
        cy.get('button[id="new-traveler-button"]').click()
        cy.get('input[name="name"]')
            .type(t.name)
        cy.get('input[name="email"]')
            .type(t.email)
        cy.get('input[name="phone"]')
            .type(t.phone)
        cy.get('input[name="personalNotes"]')
            .type(t.personalNotes)
        cy.get('button[type="submit"]').click()
        cy.contains(t.name).dblclick()
        cy.contains('Email').next().should('contain', t.email)
        cy.contains('Phone').next().should('contain', t.phone)
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label').should('contain', t.status)
        cy.get('h6[id="notes"]').should('contain', t.personalNotes)
    })

    it('edit a traveler', function () {
        cy.get('button[id="edit-info-button"]').click()
        cy.get('input[name="name"]').clear()
            .type(t.nameEdited)
        cy.get('input[name="email"]').clear()
            .type(t.emailEdited)
        cy.get('input[name="phone"]').clear()
            .type(t.phoneEdited)
        cy.get('input[name="status"]').parent()
            .click()
        cy.contains(t.statusEdited).click()
        cy.get('input[name="personalNotes"]').clear()
            .type(t.personalNotesEdited)
        cy.get('button[type="submit"]').click()
        cy.contains(t.nameEdited).dblclick()
        cy.contains('Email').next().should('contain', t.emailEdited)
        cy.contains('Phone').next().should('contain', t.phoneEdited)
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label').should('contain', t.statusEdited)
        cy.get('h6[id="notes"]').should('contain', t.personalNotes)
    })

    it('should remove a traveler', function () {
        cy.get('button[id="edit-info-button"]').click()
        cy.contains('Remove').click()
        cy.get('h6').contains(t.nameEdited).should('not.exist')
    })

    it('create a traveler', function () {
        cy.get('button[id="travelers-nav"]').click()
        cy.get('button[id="new-traveler-button"]').click()
        cy.get('input[name="name"]')
            .type(t.name)
        cy.get('input[name="email"]')
            .type(t.email)
        cy.get('input[name="phone"]')
            .type(t.phone)
        cy.get('input[name="personalNotes"]')
            .type(t.personalNotes)
        cy.get('button[type="submit"]').click()
        cy.contains(t.name).dblclick()
        cy.contains('Email').next().should('contain', t.email)
        cy.contains('Phone').next().should('contain', t.phone)
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label').should('contain', t.status)
        cy.get('h6[id="notes"]').should('contain', t.personalNotes)
    })

    it('go into trip', () => {
        cy.get('button[id="trips-nav"]').click()
        cy.contains('South Africa').dblclick()
        cy.get('div[id="travelers-section"]').click()
    })

    it('edit a traveler', function () {
        cy.get('h6').should('contain', 'Example User')
        cy.get('button[id="add-traveler-button"]').click()
        cy.get('div[id="add-traveler-to-trip"]').click()
        cy.get('li').contains(t.name).click().type('{esc}')
        cy.get('button[id="add-to-trip"]').click()

        cy.get('h6').should('contain', t.name)

        cy.get('button[id="edit-info-button"]').click()
        cy.get('input[name="name"]').clear()
            .type(t.nameEdited)
        cy.get('input[name="email"]').clear()
            .type(t.emailEdited)
        cy.get('input[name="phone"]').clear()
            .type(t.phoneEdited)
        cy.get('input[name="status"]').parent()
            .click()
        cy.contains(t.statusEdited).click()
        cy.get('input[name="personalNotes"]').clear()
            .type(t.personalNotesEdited)
        cy.get('button[type="submit"]').click()
        cy.contains(t.nameEdited).dblclick()
        cy.contains('Email').next().should('contain', t.emailEdited)
        cy.contains('Phone').next().should('contain', t.phoneEdited)
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label').should('contain', t.statusEdited)
        cy.get('h6[id="notes"]').should('contain', t.personalNotes)
    })

    it('should remove a traveler', function () {
        cy.get('button[id="edit-info-button"]').click()
        cy.contains('Remove').click()
        cy.get('h6').contains(t.nameEdited).should('not.exist')
    })
})