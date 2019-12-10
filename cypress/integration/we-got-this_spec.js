describe('We Got This Test', function() {
    it('Test Application Features', function() {
        cy.visit('http://localhost:3000/');

        cy.contains('Customers').click();

        cy.url().should('include', '/customers');
    });
});
