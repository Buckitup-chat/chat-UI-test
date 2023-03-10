export const sendMessage = (msg, type) => {
    if(type === 'chat') {
        cy.get('.t-chat-input').click().type(msg);
        cy.get('.t-chat-send-message-btn').click();
        cy.get('.t-chat-mine-message').contains(msg);
        return
    }
    cy.get('.t-room-input').click().type(msg);
    cy.get('.t-room-send-message-btn').click();
    cy.get('.t-room-mine-message').contains(msg);
}

export const selectMessages = (type) => {
    cy.get('.t-chat-content').should('be.visible');
    sendMessage('Hello', type);
    sendMessage('It is me', type);
    cy.get('.t-message-dropdown').first().click();
    cy.get('.t-dropdown').should('be.visible');
    cy.get('.t-select-message').first().click();
}

export const loginUser = (userName) => {
    cy.visit(Cypress.env('url'));
    cy.get('.t-login-form')
    .find('[type="text"]').type(userName,{force:true});
    cy.get('.t-login-form').submit();
}

export const checkIfRightUser = (userName) => {
    cy.get('.t-my-notes').eq(0).click({force: true})
    cy.get('.t-chat-header').find('.t-peer-name').should('have.text', userName);
}

export const openRoomTab = () => {
    cy.get('.t-rooms').click();
    cy.get('.t-create-room').should('be.enabled');
    cy.get('.t-sidebar-create-room').should('be.enabled');
    // cy.get('.t-confirmed-rooms > ul > .text-base').should('be.visible');
    cy.get('.t-unconfirmed-rooms').should('be.visible');
    // cy.get('.t-confirmed-rooms > ul > .text-base').contains('You have no rooms');
}

export const createOpenRoom = () => {
    cy.get('.t-sidebar-create-room').click();
    cy.get('.t-open-room').click();
    cy.get('.t-submit-create').click();
}

export const createPrivateRoom = () => {
    cy.get('.t-sidebar-create-room').click();
    cy.get('.t-private-room').click();
    cy.get('.t-submit-create').click();
}

export const createSecretRoom = () => {
    cy.get('.t-sidebar-create-room').click();
    cy.get('.t-secret-room').click();
    cy.get('.t-submit-create').click();
}

export const openInviteWindow = () => {
    cy.get('.t-invite-btn').click({force: true});
    cy.get('.t-invite-header').should('be.visible');
}

export const sendInvitation = () => {
    cy.get('.t-invite').eq(0).find('a').click();
}

export const checkInvitationSent = () => {
    cy.get('.t-inv-sent').should('be.visible');
}

export const closePopups = () => {
    cy.get('.t-close-flash-notification').click();
    cy.get('.t-close-popup').click({multiple:true, force:true});
}

export const checkIfChatOpen = () => {
    cy.get('.t-chat-content').should('be.visible');
}

export const openMessageContextMenu = () => {
    cy.get('.t-message-dropdown').click();
}

export const editMessage = (message, type) => {
    cy.get('.t-edit-message').click();
    cy.get('.t-edit').should('be.visible');
    if(type === 'chat') {
        cy.get('.t-chat-edit-input').click().type(message);
        return
    }
    cy.get('.t-room-edit-input').click().type(message);
}

export const clickDeleteButton = () => {
    cy.get('.t-delete-message').click();
    cy.get('.t-delete-message-popup').should('be.visible');
}

export const checkIfSelected = (type) => {
    if(type === 'chat') {
        cy.get('.t-delete-chat-msg-btn').should('be.visible');
        cy.get('.t-download-chat-msg-btn').should('be.visible');
        cy.get('.selectCheckbox').should('be.checked');
        return
    }
    cy.get('.t-delete-room-msg-btn').should('be.visible');
    cy.get('.t-download-room-msg-btn').should('be.visible');
    cy.get('.selectCheckbox').should('be.checked');
}

export const clickDeleteSelectedMessagesButton = (type) => {
    if(type === 'chat') {
        cy.get('.t-delete-chat-msg-btn').click();
        cy.get('.t-modal').should('be.visible');
        return
    }
    cy.get('.t-delete-room-msg-btn').click();
    cy.get('.t-modal').should('be.visible');
}

export const cancelDeletion = () => {
    cy.get('.t-cancel-delete-msg-popup-btn').click();
    cy.get('.t-modal').should('not.be.visible');
}

export const openMyNotes = () => {
    cy.get('.t-chats').click();
    cy.get('.t-my-notes').click();
}

export const openFeeds = () => {
    cy.get('.t-feeds').click({force: true});
}

export const clearDb = () => {
    cy.visit('http://localhost:4000/reset');
    cy.get('body').should("contain", "clear")
}