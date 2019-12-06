import { cyan } from "ansi-colors"

describe('We Got This Test', function () {
    it('Test Application Features', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('Customers').click()

        cy.url()
        .should('include', '/customers')
    })
} )