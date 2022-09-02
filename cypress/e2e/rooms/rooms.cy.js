const sendMessage = (msg) => {
        cy.get('.t-room-input').click().type(msg);
        cy.get('.t-room-send-message-btn').click();
        cy.get('.t-room-mine-message').contains(msg);
}

const selectMessages = () => {
    cy.get('.t-chat-content').should('be.visible');
    sendMessage('Hello');
    sendMessage('It is me');
    cy.get('.t-message-dropdown').click({ multiple: true, force: true });
    cy.get('.t-dropdown').should('be.visible');
    cy.get('.t-select-message').click({ multiple: true, force: true });
}
describe('rooms', () => { 
    before(()=> {
        const userName = 'Cypres test user';
        cy.visit(Cypress.env('url'));
        cy.get('.t-login-form')
        .find('[type="text"]').type(userName,{force:true});
        cy.get('.t-login-form').submit();
        cy.get('.t-my-notes').click();
        cy.get('.t-chat-header').find('.t-peer-name').should('have.text', userName);
        cy.get('.t-rooms').click();
        cy.get('.t-create-room').should('be.enabled');
        cy.get('.t-sidebar-create-room').should('be.enabled');
        cy.get('.t-confirmed-rooms > ul > .text-base').should('be.visible');
        cy.get('.t-unconfirmed-rooms').should('be.visible');
    })
    it('1st visit Rooms tab', () => {
        cy.get('.t-confirmed-rooms > ul > .text-base').contains('You have no rooms');
    })
  
    it('Create Open Room', () => {
        cy.get('.t-create-room').click();
        cy.get('.t-open-room').click();
        cy.get('.t-submit-create').click();
    })

    it('Invite to the Open Room', () => {
        cy.get('.t-invite-btn').click();
        cy.get('.t-invite-header').should('be.visible');
        cy.get('.t-invite').eq(0).find('a').click();
        cy.get('.t-inv-sent').should('be.visible');
        cy.get('.t-close-flash-notification').click();
        cy.get('.t-close-popup').click({multiple:true, force:true});
    })

    it('Invite to the Private Room', () => {
        cy.get('.t-sidebar-create-room').click();
        cy.get('.t-private-room').click();
        cy.get('.t-submit-create').click();
        cy.get('.t-invite-btn').click({force:true});
        cy.get('.t-invite').eq(0).find('a').click();
        cy.get('.t-inv-sent').should('be.visible');
        cy.get('.t-close-flash-notification').click();
        cy.get('.t-close-popup').click({multiple:true, force:true});
    })  
    
    
    it('Invite to the Secret Room', () => {
        cy.get('.t-sidebar-create-room').click();
        cy.get('.t-secret-room').click();
        cy.get('.t-submit-create').click();
        cy.get('.t-invite-btn').click({force:true});
        cy.get('.t-invite').eq(0).find('a').click();
        cy.get('.t-inv-sent').should('be.visible');
        cy.get('.t-close-flash-notification').click();
        cy.get('.t-close-popup').click({multiple:true, force:true});
    })  

    it('Send messages to the rooms', () => {
        cy.get('.t-chat-content').should('be.visible');
        sendMessage('Hello')
    })

    it('Edit messages to the rooms', () => {
        cy.get('.t-chat-content').should('be.visible');
        cy.get('.t-message-dropdown').click();
        cy.get('.t-edit-message').click();
        cy.get('.t-edit').should('be.visible');
        cy.get('.t-room-edit-input').click().type(' how are you?');
        cy.get('.t-cancel-edit').click();
        cy.get('.t-message-dropdown').click();
        cy.get('.t-edit-message').click();
        cy.get('.t-edit').should('be.visible');
        cy.get('.t-room-edit-input').click().type(' how are you?');
        cy.get('.t-room-edit-send-btn').click({force:true});
        cy.get('.t-room-mine-message').contains('Hello how are you?');
    })

    it('Delete messages to the rooms', () => {
        cy.get('.t-chat-content').should('be.visible');
        cy.get('.t-message-dropdown').click();
        cy.get('.t-delete-message').click();
        cy.get('.t-delete-message-popup').should('be.visible');
        cy.get('.t-delete-cancel').click();
        cy.get('.t-delete-message-popup').should('not.be.visible');
        cy.get('.t-message-dropdown').click();
        cy.get('.t-delete-message').click();
        cy.get('.t-delete-message-btn').click();
        cy.get('.t-room-mine-message').should('not.be.visible');
    })

    it('Select masseges to the Rooms', () => {
        selectMessages();
        cy.get('.t-delete-room-msg-btn').should('be.visible');
        cy.get('.t-download-room-msg-btn').should('be.visible');
        cy.get('.selectCheckbox').should('be.checked');
        cy.get('.t-room-mine-message').click({ multiple: true, force: true });
        cy.get('.t-room-input').should('be.visible');
    })

    it('Delete selected to the Rooms', () => {
        selectMessages();
        cy.get('.t-delete-room-msg-btn').click();
        cy.get('.t-modal').should('be.visible');
        cy.get('.t-cancel-delete-msg-popup-btn').click();
        cy.get('.t-modal').should('not.be.visible');  
        cy.get('.t-delete-room-msg-btn').click();
        cy.get('.t-modal').should('be.visible');
        cy.get('.t-delete-message-popup-btn').click();
        cy.get('.t-room-mine-message').should('not.be.visible');
    })
  })