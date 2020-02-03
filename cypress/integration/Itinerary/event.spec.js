import faker from 'faker'
import loginAfterSeed from '../Util/loginAfterSeed'

describe('Add, edit, and delete a event', () => {
    loginAfterSeed()
    let month = (new Date()).getMonth() + 1
    month = month.toString().length === 1 ? `0${month}` : month
    const year = (new Date()).getFullYear()
    const startDay = 11
    const endDay = 15
    const start = `${month}-${startDay}-${year}`
    const editedDay = 15
    const editedDate = `${month}-${editedDay}-${year}`

    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should add an event', function () {
        const e = {
            name: 'Fly to Lisbon',
            date: start,
            start: '7',
            end: '8',
            startTime: '1:00 pm',
            endTime: '2:00 pm',
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
        cy.get('div[id="itinerary-section"]').click()
        cy.get('button[id="new-activity"]').click()
        cy.get('input[id="event-name"]')
            .type(e.name)
        cy.get('input[name="dateStart"]')
            .clear()
        cy.get('p').contains(startDay).click()
        cy.get(`input[value="${e.type}"]`).click()
        cy.get('input[name="description"]')
            .type(e.description)
        cy.get('input[id="google-map-places"]').click()
            .type(e.location)
        cy.get('span[id="location-tab"]').should('contain', 'San Jose Airport - Terminal A')
        cy.get('input[id="google-map-places"]').type('{downarrow}').type('{enter}')
        cy.get('div[id="documents-multiple-select"]').click()
        cy.get('li').should('contain', e.documents[0])
        cy.get('li').contains(e.documents[0]).click().type('{esc}')
        cy.get('input[name="links"]')
            .type(e.links)
        cy.get('button[id="event-submit-button"]')
            .click()
        cy.get('h2[id="activity-name"]', { timeout: 5000 }).should('contain', e.name)
        cy.get('h6').should('contain', "Fly to Lisbon")
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
            startTime: '1:00 pm',
            endTime: '2:00 pm',
            description:
                'You will meet at ur mums and fly to lisbon',
            type: 'EVENT',
            location: 'San Jose Airport - Terminal A, San Jose, CA, USA',
            documents: [
                'Example Document'
            ],
            links: 'www.reddit.com www.google.com'
        }

        cy.get('h2[id="activity-name"]').contains('Fly to London').parent().next().click()
        cy.get('input[id="event-name"]')
            .clear()
            .type(e.name)
        cy.get('input[name="dateStart"]')
            .clear()
        cy.get('p').contains(editedDay).click()
        cy.get(`input[value="${e.type}"]`).click()
        cy.get('input[id="timezone"]').type('US/ALASKA').type('{enter}')//.type('{esc}')
        cy.get('input[name="description"]')
            .clear()
            .type(e.description)
        cy.get('input[id="google-map-places"]')
            .clear()
            .type(e.location)
        cy.get('span[id="location-tab"]').should('contain', 'San Jose Airport - Terminal A')
        cy.get('input[id="google-map-places"]').type('{downarrow}').type('{enter}')
        cy.get('div[id="documents-multiple-select"]').click()
        cy.get('li').contains(e.documents[0]).click().type('{esc}')
        cy.get('input[name="links"]')
            .clear()
            .type(e.links)
        cy.get('button[id="event-submit-button"]')
            .click()

        cy.get('.MuiCard-root').should('contain', e.name)
        cy.get('h6').should('contain', e.name)
        cy.get('.MuiCard-root').should('contain', e.startTime + ' - ' + e.endTime)
        cy.get('.MuiCard-root').should('contain', e.description)
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[0])
        cy.get('.MuiCard-root').should('contain', e.links.split(' ')[1])
        cy.get('.MuiCard-root').should('contain', e.documents[0])
        cy.get('.MuiCard-root').should('contain', e.location)
    })

    it('should remove an event', function () {
        cy.get('h2[id="activity-name"]').contains('Fly to ur mums').parent().next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.get('.MuiCard-root').should('not.contain', 'Fly to ur mums')
    })

})