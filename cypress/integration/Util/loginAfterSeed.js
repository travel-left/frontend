export default function () {
    it('log in and check url', function () {
        cy.request('POST', 'http://localhost:8081/seed', {
            token: 'hkdjashgiuahupri4yiaugsdfgipuaduaophp4uahdkjafhsiudy'
        })
            .then((response) => {
                expect(response.body).to.be.ok
            })
        cy.visit('/')
        cy.contains('Sign in').click()
        cy.url().should('include', '/signin')
        cy.get('input[name="email"]')
            .type('admin@admin.com')
        cy.get('input[name="password"]')
            .type('password')
        cy.get('button[id="signin"]').click()
        cy.url().should('include', '/trips')
    })
}