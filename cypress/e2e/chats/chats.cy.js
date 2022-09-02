import {loginUser} from "../../helpers/helpers";

const sendMessage = (msg) => {
    cy.get('.t-chat-input').click().type(msg);
    cy.get('.t-chat-send-message-btn').click();
    cy.get('.t-chat-mine-message').contains(msg);
}

const selectMessages = () => {
    sendMessage('Hello');
    sendMessage('It is me');
    cy.get('.t-message-dropdown').click({ multiple: true, force: true });
    cy.get('.t-dropdown').should('be.visible');
    cy.get('.t-select-message').click({ multiple: true, force: true });
}

describe('chats', () => { 
    before(()=> {
        const userName = 'Test User'
      loginUser(userName)
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

    it('Select messages in My private notes', () => {
        selectMessages();
        cy.get('.t-delete-chat-msg-btn').should('be.visible');
        cy.get('.t-download-chat-msg-btn').should('be.visible');
        cy.get('.selectCheckbox').should('be.checked');
        cy.get('.t-chat-mine-message').click({ multiple: true, force: true });
        cy.get('.t-chat-input').should('be.visible');
    })

    it('Delete selected messages in My private notes', () => {
        selectMessages();
        cy.get('.t-delete-chat-msg-btn').click();
        cy.get('.t-modal').should('be.visible');
        cy.get('.t-cancel-delete-msg-popup-btn').click();
        cy.get('.t-modal').should('not.be.visible');  
        cy.get('.t-delete-chat-msg-btn').click();
        cy.get('.t-modal').should('be.visible');
        cy.get('.t-delete-message-popup-btn').click();
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })
});