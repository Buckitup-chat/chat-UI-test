beforeEach(() => {
    const userName = 'Cypres test user';
    cy.visit(Cypress.env('url'))
    cy.get('.t-form')
    .find('[type="text"]').type(userName,{force:true})
    cy.get('.t-form').submit()
    cy.get('.row > .sidebarIcon').click();
    cy.get('.t-download-key').should('be.visible');
    cy.get('.t-logout-without-key').should('be.visible');
    cy.get('.t-cancel-logout').should('be.visible');
    cy.get('.t-close-logout-popup').should('be.visible');
})
describe('Log Out & Back Up', () => {
    it('Successfully logout', () => {
        cy.get('.t-close-logout-popup').click({multiple: true, force: true});
        cy.get('.t-logout-modal').should('not.be.visible');
    })
  
    it('Cancel logout', () => {
        cy.get('.t-cancel-logout').click();
        cy.get('.t-logout-modal').should('not.be.visible');
    })

    it('Logout without the key', () => {
        cy.get('.t-logout-without-key').click();
        cy.get('.t-form').should('be.visible');
    })
  })