describe('We Got This Test', function () {
    it('Test New Job Page Functionality', function () {
        cy.visit()

        // cy.pause()

        cy.contains('New Job').click()

    })
} )