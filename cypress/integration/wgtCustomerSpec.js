describe('We Got This Test', function() {
    it('Test Customer Page Functionality', function() {
        cy.visit('/customers');

        // cy.pause()

        // cy.contains('Customers').click()

        // cy.url()
        // .should('include', '/customers')

        // cy.contains('Sanny').click()
        cy.url().should('include', '/customers');
    });
});

// describe('We Got This Test', function () {

//     it('Test Customer Page Functionality', function () {
//         cy.visit('/customers')
// // cy.fixture("newCustomer").as("newCustomer");
//         // cy.pause()

//         cy.contains('Customers').click()

//         cy.url()
//         .should('include', '/customers')

//         cy.contains('New Customer').click()

//     //     cy
//     //     .get('input[id="name"]')
//     //     .type(this.newCustomer.name)
//     //     .should("have.value", this.newCustomer.name);
//     //   cy
//     //     .get('input[id="email"]')
//     //     .type(this.newCustomer.email)
//     //     .should("have.value", this.newCustomer.email);
//     //   cy
//     //     .get('input[id="phoneNumber"]')
//     //     .type(this.newCustomer.phoneNumber)
//     //     .should("have.value", this.newCustomer.phoneNumber);
//     //   cy
//     //     .get('input[id="street"]')
//     //     .type(this.newCustomer.street)
//     //     .should("have.value", this.newCustomer.street);

//     //   cy.get("#NewCustomerForm").submit();
//     })
// } )
