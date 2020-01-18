import loginAfterSeed from '../Util/loginAfterSeed'

describe('update coordinators photo', () => {
    loginAfterSeed()
    const c = {
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Knuckles_the_Echidna.png/220px-Knuckles_the_Echidna.png'
    }

    it('should update a coordinators photo', function () {

        cy.contains('Admin Administrator').next().click()
        cy.get('li').contains('Account').click()
        cy.get('.img-box').click()

        cy.get('input[name="link"]')
            .type(c.image)
        cy.get('button[id="submit-cover-photo"]').click()
        cy.get('.img-box').children().first().should('have.attr', 'src', c.image)

    })
})