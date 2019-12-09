describe('We Got This Test', function () {
    it('Test Customer Page Functionality', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('Customers').click()

        cy.url()
        .should('include', '/customers')

        cy.contains('New Customer').click()
    })
} )





