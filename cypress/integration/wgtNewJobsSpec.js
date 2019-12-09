describe('We Got This Test', function () {
    it('Test New Job Page Functionality', function () {
        cy.visit('http://localhost:3000/')

        // cy.pause()

        cy.contains('New Job').click()

    })
} )