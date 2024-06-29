Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Abias')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('abias@gmail.com')

    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFields', function() {
    cy.get('#firstName').type('Abias')
    cy.get('#lastName').type('Santana')
    cy.get('#email').type('abias@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
