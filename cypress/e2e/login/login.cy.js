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
})
