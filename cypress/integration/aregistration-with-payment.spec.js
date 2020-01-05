import loginAfterSeed from './Util/loginAfterSeed'

describe('create a trip registration, a traveler completes it', () => {
    loginAfterSeed()
    const t = {
        name: 'New Traveler',
        email: 'new@traveler.com',
        phone: '559-393-5872',
        personalNotes: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
        status: 'CONFIRMED',
        card: {
            number: '4242424242424242',
            cvc: '123',
            date: '01/28',
            zipcode: '93270'
        },
        paymentDate: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format()
    }
    it('go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should create a trip registration, traveler registers, traveler appears in dashboard', function () {

        cy.contains('Manage Travelers').children().first().click()
        cy.contains('registration form').click()
        cy.get('input[value="hasName"]').click()
        cy.get('input[value="hasEmail"]').click()
        cy.get('input[value="hasPhone"]').click()
        cy.get('input[value="hasPersonalNotes"]').click()
        cy.get('input[value="hasDueDate"]').click()
        cy.get('input[value="hasPublish"]').click()
        cy.get('input[value="hasPaymentAmount"]').click()
        cy.get('input[name="paymentAmount"]').type('2.00')
        cy.get('input[name="dueDate"]').clear().type('10-01-2020')
        cy.get('button[type="submit"]').click()
        cy.get('.share-trip-button').click()
        let path
        cy.location('pathname').then(url => {

            path = url
            path = path.split('/travelers')[0]
            cy.get('.modal-close-button').click()
            cy.contains('Admin Administrator').next().click()
            cy.get('li').contains('Logout').click()

            cy.visit(`${path}/share`)
            cy.get('.register-button').click()
            cy.get('input[name="name"]')
                .type(t.name)
            cy.get('input[name="email"]')
                .type(t.email)
            cy.get('input[name="phone"]')
                .type(t.phone)
            cy.get('input[name="personalNotes"]')
                .type(t.personalNotes)
            cy.get('button[type="submit"]').click()
            cy.pause()
            cy.get('h4').should('contain', 'You have been succesfully registered for South Africa')
            cy.visit('/')
            cy.contains('Sign in').click()
            cy.url().should('include', '/signin')
            cy.get('input[name="email"]')
                .type('admin@admin.com')
            cy.get('input[name="password"]')
                .type('password')
            cy.get('button[id="signin"]').click()
            cy.url().should('include', '/trips')
            cy.contains('Travelers').click()
            cy.contains('New Traveler').dblclick()
            cy.contains('Email').next().should('contain', t.email)
            cy.contains('Phone').next().should('contain', t.phone)
            cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label').should('contain', t.status)
            cy.get('.TripInfo-description').should('contain', t.personalNotes)
            cy.contains('Payments').click()
            cy.get('.TravelerInfo-text-date').should('contain', t.paymentDate)
            cy.get('.TravelerInfo-text-date').should('contain', '2.00')
            cy.get('.TravelerInfo-text-date').should('contain', 'Registration')
        })
    })
})