const sendMessage = (msg) => {
    cy.get('.t-chat-input').click().type(msg);
    cy.get('.t-chat-send-message-btn').click();
    cy.get('.t-chat-mine-message').contains(msg);
}

const selectMessages = () => {
cy.get('.t-chat-content').should('be.visible');
sendMessage('Hello');
sendMessage('It is me');
cy.get('.t-message-dropdown').click({ multiple: true, force: true });
cy.get('.t-dropdown').should('be.visible');
cy.get('.t-select-message').click({ multiple: true, force: true });
}

describe('chats', () => { 
    before(()=> {
        const userName = 'Cypres test user';
        cy.visit(Cypress.env('url'));
        cy.get('.t-login-form')
        .find('[type="text"]').type(userName,{force:true});
        cy.get('.t-login-form').submit();
        cy.get('.t-my-notes').click();
        cy.get('.t-chat-header').find('.t-peer-name').should('have.text', userName);
    })

    it('Send to My private notes', () => {
        sendMessage('Hi there')
    })

    it('Edit My private notes', () => {
        cy.get('.t-message-dropdown').click();
        cy.get('.t-edit-message').click();
        cy.get('.t-edit').should('be.visible');
        cy.get('.t-chat-edit-input').click().type(' how are you?');
        cy.get('.t-cancel-edit').click();
        cy.get('.t-message-dropdown').click();
        cy.get('.t-edit-message').click();
        cy.get('.t-edit').should('be.visible');
        cy.get('.t-chat-edit-input').click().type(' how are you?');
        cy.get('.t-chat-edit-send-btn').click({force:true});
        cy.get('.t-chat-mine-message').contains('Hi there how are you?');
    })

    it('Delete My private notes', () => {
        cy.get('.t-message-dropdown').click();
        cy.get('.t-delete-message').click();
        cy.get('.t-delete-message-popup').should('be.visible');
        cy.get('.t-delete-cancel').click();
        cy.get('.t-delete-message-popup').should('not.be.visible');
        cy.get('.t-message-dropdown').click();
        cy.get('.t-delete-message').click();
        cy.get('.t-delete-message-btn').click();
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })
});