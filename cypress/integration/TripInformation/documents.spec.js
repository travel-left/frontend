import loginAfterSeed from '../Util/loginAfterSeed'

describe('add, edit, and remove a document', () => {
    loginAfterSeed()

    const d = {
        description: 'a document description'
    }

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should add a document to a trip', function () {
        cy.fixture('left.png', 'base64').then(fileContent => {
            cy.get('.FileUploader').children().first().upload(
                { fileContent, fileName: 'left.png', mimeType: 'image/png' },
                { subjectType: 'drag-n-drop', events: ['dragenter', 'drop'] },
            )
            cy.get('.left-resource').should('contain', 'left.png')
        });
    })

    it('should edit a document on a trip', () => {
        cy.contains('left.png').next().click()
        cy.get('input[name="description"]')
            .type(d.description)
        cy.get('button[type="submit"]').click()
        cy.get('.left-resource').should('contain', d.description)
    })

    it('should remove a document from a trip', () => {
        cy.contains('left.png').next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.get('.left-resource').should('not.contain', d.description)
    })

})

describe('add, edit, and remove a link', () => {
    loginAfterSeed()

    const l = {
        name: 'a link name',
        description: 'a link description',
        link: 'https://google.com',
        nameEdited: 'a link name edit',
        descriptionEdited: 'a link description edit',
        linkEdited: 'https://googleedited.com'
    }

    it('should go into trip', () => {
        cy.contains('South Africa').dblclick()
    })

    it('should add a link to a trip', function () {
        cy.get('.add-new-trip-link-button').click()
        cy.get('input[name="name"]')
            .type(l.name)
        cy.get('input[name="description"]')
            .type(l.description)
        cy.get('input[name="link"]')
            .type(l.link)
        cy.get('button[type="submit"]').click()
        cy.get('.left-resource').should('contain', l.name)
        cy.get('.left-resource').should('contain', l.description)
        cy.get('.left-resource').should('contain', l.link)
    })

    it('should edit a link on a trip', () => {
        cy.contains(l.name).next().click()
        cy.get('input[name="name"]').clear()
            .type(l.nameEdited)
        cy.get('input[name="description"]').clear()
            .type(l.descriptionEdited)
        cy.get('input[name="link"]').clear()
            .type(l.linkEdited)
        cy.get('button[type="submit"]').click()
        cy.get('.left-resource').should('contain', l.nameEdited)
        cy.get('.left-resource').should('contain', l.descriptionEdited)
        cy.get('.left-resource').should('contain', l.linkEdited)
    })

    it('should remove a link from a trip', () => {
        cy.contains(l.nameEdited).next().click()
        cy.get('button[type="button"]').contains('Remove').click()
        cy.get('.left-resource').should('not.contain', l.nameEdited)
    })

})