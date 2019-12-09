describe('We Got This Test', function () {
    it('Customer Route Test', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('Customers').click()

        cy.url()
        .should('include', '/customers')
    })
} )

describe('We Got This Test 2', function () {
    it('Technician Route Test', function () {
        cy.visit('http://localhost:3000/')

        

        cy.contains('Techs').click()

        cy.url()
        .should('include', '/techs')
    })
} )

describe('We Got This Test 3', function () {
    it('Jobs Route Test', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('Jobs').click()

        cy.url()
        .should('include', '/jobs')
    })
} )

describe('We Got This Test 3', function () {
    it('New Job Route Test', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('New Job').click()

    })
} )