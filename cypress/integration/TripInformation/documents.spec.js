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