import {
    cancelDeletion,
    checkIfRightUser, checkIfSelected, clickDeleteButton, clickDeleteSelectedMessagesButton,
    editMessage,
    loginUser,
    openMessageContextMenu,
    selectMessages,
    sendMessage
} from "../../helpers/helpers";

describe('chats', () => { 
    before(()=> {
        const userName = 'Test User'
        loginUser(userName)
        checkIfRightUser(userName)
    })

    it('Send to My private notes', () => {
        sendMessage('Hi there', 'chat')
    })

    it('Edit My private notes', () => {
        const message = ' how are you?'
        openMessageContextMenu();
        editMessage(message, 'chat');
        //cancel editing
        cy.get('.t-cancel-edit').click();
        openMessageContextMenu();
        editMessage(message, 'chat');
        //sends message
        cy.get('.t-chat-edit-send-btn').click({force:true});
        //check if the right message
        cy.get('.t-chat-mine-message').contains('Hi there how are you?');
    })

    it('Delete My private notes', () => {
       openMessageContextMenu();
        clickDeleteButton();
        //cancel deleting
        cy.get('.t-delete-cancel').click();
        cy.get('.t-delete-message-popup').should('not.be.visible');
        openMessageContextMenu();
        clickDeleteButton();
        //deletes message
        cy.get('.t-delete-message-btn').click();
        //check if the message deleted
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })

    it('Select messages in My private notes', () => {
        selectMessages('chat');
        checkIfSelected('chat');
        //click messages for unselect
        cy.get('.t-chat-mine-message').click({ multiple: true, force: true });
        //check if unselected
        cy.get('.t-chat-input').should('be.visible');
    })

    it('Delete selected messages in My private notes', () => {
        selectMessages('chat');
        clickDeleteSelectedMessagesButton('chat')
        cancelDeletion();
        clickDeleteSelectedMessagesButton('chat');
        //deletes selected messages
        cy.get('.t-delete-message-popup-btn').click();
        //check if selected messages deleted
        cy.get('.t-chat-mine-message').should('not.be.visible');
    })
});