describe('We Got This Test', function () {
    it('Test Job Page Functionality', function () {
        cy.visit('/jobs')

        // cy.pause()

        cy.contains('Jobs').click()

        cy.url()
        .should('include', '/jobs')

        
    })
} )