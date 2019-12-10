describe('We Got This Test', function () {
    it('Test Technician Page Functionality', function () {
        cy.visit('/techs')

        

        cy.contains('Techs').click()

        cy.url()
        .should('include', '/techs')
    })
} )

describe('We Got This Test 2', function () {
    it('Test New Tech Button Functionality', function () {
        cy.request('/techs')

        

        cy.contains('Techs').click()

        cy.url()
        .should('include', '/techs')

        cy.get('button').click({ multiple: true })
    })
} )

