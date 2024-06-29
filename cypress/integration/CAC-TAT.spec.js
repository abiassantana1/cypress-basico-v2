/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(function() {
        // cy.viewport('iphone-6+')
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const textoLongo = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '
        cy.get('#firstName').type('Abias')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('abias@gmail.com')

        cy.get('#open-text-area').type(textoLongo, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Abias')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('abiasgmailcom')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone só aceita numeros', function() {
        cy.get('#firstName').type('Abias')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('abiasgmailcom')
        cy.get('#phone').type('teste').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Abias')
        cy.get('#lastName').type('Santana')
        cy.get('#email').type('abias@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('#firstName')
            .type('Abias').should('have.value', 'Abias')
            .clear().should('have.value', '')

        cy.get('#lastName')
            .type('Santana').should('have.value', 'Santana')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('abias@gmail.com').should('have.value', 'abias@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('9999999').should('have.value', '9999999')
            .clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area')
            .type('Teste').should('have.value', 'Teste')
            .clear().should('have.value', '')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.fillMandatoryFields()
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function(arquivo) {
                expect(arquivo[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function(arquivo) {
                expect(arquivo[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function(arquivo) {
                expect(arquivo[0].files[0].name).to.equals('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})
  