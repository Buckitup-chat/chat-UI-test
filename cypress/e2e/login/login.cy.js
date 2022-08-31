describe('login a user', () => {
  const userName = 'Cypres test user';
  it('successfully logined', () => {
    cy.visit(Cypress.env('url'));
    cy.get('.t-login-form')
    .find('[type="text"]').type(userName,{force:true});
    cy.get('.t-login-form').submit();
    cy.get('.t-my-notes').click();
    cy.get('.t-chat-header').find('.t-peer-name').should('have.text', userName);
  })

  // it('Successfully login via import the recovery keys  without password', () => {
  //   cy.get('.row > .sidebarIcon').click();
  //   cy.get('#logout-backup-popup-content > .mt-5').click();
  //    cy.get('.mt-3.h-12').click(); 
  //    cy.get('.t-exit').click()    
  // })
})