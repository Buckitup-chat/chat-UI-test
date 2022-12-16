beforeEach(() => {
    const userName = 'Cypres test user';
    cy.visit(Cypress.env('url'))
    cy.get('.t-login-form')
    .find('[type="text"]').type(userName,{force:true})
    cy.get('.t-login-form').submit()
    cy.get('.t-logout').click({force:true});
    cy.get('.t-download-key').should('be.visible');
    cy.get('.t-logout-without-key').should('be.visible');
    cy.get('.t-cancel-logout').should('be.visible');
    cy.get('.t-close-popup').should('be.visible');
})
describe('Log Out & Back Up', () => {
    it('Successfully logout', () => {
        cy.get('.t-close-popup').click({multiple: true, force: true});
        cy.get('.t-modal').should('not.be.visible');
    })
  
    it('Cancel logout', () => {
        cy.get('.t-cancel-logout').click();
        cy.get('.t-modal').should('not.be.visible');
    })

    it('Logout without the key', () => {
        cy.get('.t-logout-without-key').click();
        cy.get('.t-logout-without-key-modal').should('be.visible');
        cy.get('.t-logout-btn').click();
        cy.get('.t-login-form').should('be.visible');
    })
  })