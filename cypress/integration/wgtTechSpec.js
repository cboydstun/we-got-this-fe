describe('We Got This Test', function () {
    it('Test Technician Page Functionality', function () {
        cy.visit('http://localhost:3000/')

        

        cy.contains('Techs').click()

        cy.url()
        .should('include', '/techs')
    })
} )