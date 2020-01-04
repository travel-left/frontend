import faker from 'faker'
import loginAfterSeed from '../Util/loginAfterSeed'

describe('Add, edit, and delete a event', () => {
    loginAfterSeed()

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should add an event', function () {
        const e = {
            name: 'Fly to Lisbon',
            date: '01-10-2020',
            start: '7',
            end: '8',
            startTime: '7:00 am',
            endTime: '8:00 am',
            description:
                'You will meet at LAX and fly to lisbon',
            type: 'EVENT',
            location: 'San Jose Airport - Terminal A, San Jose, CA, USA',
            documents: [
                'Example Document',
                'Another example'
            ],
            links: 'www.reddit.com www.google.com'
        }
        cy.contains('Manage Itinerary').children().first().click()
        cy.contains('NEW EVENT').click()
        cy.get('input[id="event-name"]')
            .type(e.name)
        cy.get('input[name="dateStart"]')
            .clear()
            .type(e.date)
        cy.get(`input[value="${e.type}"]`).click()
        cy.get('input[name="start"]')
            .clear().type(e.startTime)
        cy.get('input[name="end"]')
            .clear().type(e.endTime)
        cy.get('input[name="description"]')
            .type(e.description)
        cy.get('input[id="google-map-places"]')
            .type(e.location).type('{downarrow}').type('{enter}')
        cy.get('div[id="documents-multiple-select"]').click()
        cy.get('li').contains(e.documents[0]).click().type('{esc}')
        cy.get('input[name="links"]')
            .type(e.links)
        cy.get('.event-submit-button')
            .click()

        cy.get('.MuiCard-root').should('contain', e.name)
        cy.get('h6').should('contain', "Jan 10 - Fly to Lisbon")
        cy.get('.MuiCard-root').should('contain', e.startTime + ' - ' + e.endTime)
        cy.get('.MuiCard-root').should('contain', e.description)
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[0])
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[1])
        cy.get('.MuiCard-root').should('contain', e.documents[0])
        cy.get('.MuiCard-root').should('contain', e.location)

    })

    it('should edit an event and check timezone', function () {
        const e = {
            name: 'Fly to ur mums',
            date: '02-11-2020',
            start: '7',
            end: '8',
            startTime: '7:00 am',
            endTime: '8:00 am',
            description:
                'You will meet at ur mums and fly to lisbon',
            type: 'EVENT',
            location: 'San Jose Airport - Terminal A, San Jose, CA, USA',
            documents: [
                'Example Document'
            ],
            links: 'www.reddit.com www.google.com'
        }

        cy.get('.event-title').contains('Fly to London').parent().next().click()

        cy.get('input[id="event-name"]')
            .clear()
            .type(e.name)
        cy.get('input[name="dateStart"]')
            .clear()
            .type(e.date)
        cy.get(`input[value="${e.type}"]`).click()
        cy.get('input[name="start"]')
            .clear().type(e.startTime)
        cy.get('input[name="end"]')
            .clear().type(e.endTime)
        cy.get('input[id="timezone"]').type('US/ALASKA').type('{enter}').type('{esc}')
        cy.get('input[name="description"]')
            .clear()
            .type(e.description)
        cy.get('input[id="google-map-places"]')
            .clear()
            .type(e.location).type('{downarrow}').type('{enter}')
        cy.get('div[id="documents-multiple-select"]').click()
        cy.get('li').contains(e.documents[0]).click().type('{esc}')
        cy.get('input[name="links"]')
            .clear()
            .type(e.links)
        cy.get('.event-submit-button')
            .click()

        cy.get('.MuiCard-root').should('contain', e.name)
        cy.get('h6').should('contain', "Feb 11 - " + e.name)
        cy.get('.MuiCard-root').should('contain', '8:00 am - 9:00 am')
        cy.get('.MuiCard-root').should('contain', e.description)
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[0])
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[1])
        cy.get('.MuiCard-root').should('contain', e.documents[0])
        cy.get('.MuiCard-root').should('contain', e.location)
    })

    it('should remove an event', function () {
        cy.get('.event-title').contains('Fly to ur mums').parent().next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.get('.MuiCard-root').should('not.contain', 'Fly to ur mums')
    })

})