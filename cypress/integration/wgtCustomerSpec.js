describe('We Got This Test', function () {
    it('Test Customer Page Functionality', function () {
        cy.visit('/customers')

        // cy.pause()

        cy.contains('Customers').click()

        cy.url()
        .should('include', '/customers')

        cy.contains('Sanny').click()

        cy.get()
    })
} )

describe('We Got This Test', function () {
    it('Test Customer Page Functionality', function () {
        cy.visit('/customers')

        // cy.pause()

        cy.contains('Customers').click()

        cy.url()
        .should('include', '/customers')

        cy.contains('New Customer').click()
    })
} )





