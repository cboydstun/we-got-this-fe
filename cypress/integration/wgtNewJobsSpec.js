describe('We Got This Test', function () {
    it('Test New Job Page Functionality', function () {
        cy.visit("/")

        // cy.pause()

        cy.contains('Month').click()

        // cy.contains('15').click()

        // cy.get('#datepicker').click();
        //choose previous month
        // cy.contains('Prev').click();
        // //choose next month 
        // cy.contains('Next').click();
        //choose date 24
        // cy.contains('24').click();

    })
} )