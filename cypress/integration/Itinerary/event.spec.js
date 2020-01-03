import faker from 'faker'
import loginAfterSeed from '../Util/loginAfterSeed'

describe('Add, edit, and delete a event', () => {
    loginAfterSeed()
    const e = {
        name: 'Fly to London',
        date: '01-10-2020',
        startTime: '11:11 AM',
        endTime: '02:00 PM',
        description:
            'You will meet at LAX and Karen will meet you there to hand out your passports. Once in London, meet up Mark near terminal 5',
        type: 'EVENT',
        location: '1 World Way, Los Angeles, CA, USA',
        documents: [
            'Example Document',
            'Another example'
        ],
        links: 'www.hello.com www.whatsyourname.com'
    }
    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should add an event', function () {
        cy.contains('Manage Itinerary').children().first().click()
        cy.contains('NEW EVENT').click()
        cy.get('input[id="event-name"]')
            .type(e.name)
        cy.get(`input[value="${e.type}"]`).click()
        cy.get('input[name="dateStart"]')
            .type(e.date)
        cy.get('input[name="description"]')
            .type(e.description)
        cy.get('input[id="google-map-places"]')
            .type(e.location).type('{esc}')
        cy.get('input[value="links"]')
            .type(e.links).type(e.links)
    })

})